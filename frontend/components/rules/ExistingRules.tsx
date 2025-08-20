'use client';

import { useEffect, useState } from "react";
import { clientConfig } from "../../config/clientEnv";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableCaption, TableHeader, TableBody, TableHead, TableCell, TableRow } from "@/components/ui/table";

type Rule = {
    id: number;
    value: string | number;
    mode: "blacklist" | "whitelist";
    active: boolean;
    type: "ip" | "url" | "port";
};

export default function ExistingRules() {
    const [rules, setRules] = useState<Rule[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${clientConfig.apiBase}/rules`)
        .then((res) => res.json())
        .then((data) => {
            const flat: Rule[] = [];

            Object.entries(data.rules).forEach(([type, arr]) => {
            (arr as any[]).forEach((r) => {
                flat.push({
                ...r,
                type: type as "ip" | "url" | "port",
                });
            });
            });

            setRules(flat);
            setLoading(false);
        })
        .catch(() => setLoading(false));
    }, []);

    async function handleDelete(value: number | string, type: string, mode: string) {
        try {
            await fetch(`${clientConfig.apiBase}/${type}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ values: [value], mode }),
            });
            setRules((prev) => prev.filter((r) => !(r.value === value && r.type === type && r.mode === mode)));
        } catch (err) {
            console.error("Delete failed", err);
        }
    }
    async function handleToggleActive(rule: { id: number; value: string | number; type: string; mode: string; active: boolean }) {
        try {
            const keyMap: Record<string, "ips" | "urls" | "ports"> = {
                ip: "ips",
                url: "urls",
                port: "ports",
            };

            const payload: Record<string, any> = {
                ips: {},
                urls: {},
                ports: {},
            };

            payload[keyMap[rule.type]] = {
                ids: [rule.id],
                mode: rule.mode,
                active: !rule.active,
            };

            await fetch(`${clientConfig.apiBase}/rules`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            setRules((prev) =>
                prev.map((r) =>
                    r.id === rule.id && r.type === rule.type
                    ? { ...r, active: !r.active }
                    : r
                )
            );
        } catch (err) {
            console.error("Toggle active failed", err);
        }
    }


    if (loading) return <p className="p-4">Loading...</p>;

    return (
        <div className="p-6 flex justify-center">
        <Card className="w-full max-w-4xl">
            <CardHeader>
            <CardTitle className="text-center">Existing Rules</CardTitle>
            </CardHeader>
            <CardContent>
            <Table>
                <TableCaption>A list of all current firewall rules</TableCaption>
                <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Mode</TableHead>
                    <TableHead className="text-center">Active</TableHead>
                    <TableHead className="text-center">Delete</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {rules.map((r: any) => (
                    <TableRow key={`${r.type}-${r.id}`}>
                    <TableCell>{r.id}</TableCell>
                    <TableCell className="capitalize">{r.type}</TableCell>
                    <TableCell>{r.value}</TableCell>
                    <TableCell className="capitalize">{r.mode}</TableCell>
                    <TableCell className="flex items-center gap-3 justify-center">
                        <Switch
                        checked={r.active}
                        onCheckedChange={() => handleToggleActive(r)}
                        />
                        <span className="text-sm">{r.active ? "Active" : "Inactive"}</span>
                    </TableCell>
                    <TableCell className="text-center">
                        <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(r.value, r.type, r.mode)}
                        >
                        ✕
                        </Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
        </div>
    );
}
