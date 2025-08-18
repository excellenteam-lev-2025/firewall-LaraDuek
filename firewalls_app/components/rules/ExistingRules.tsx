import { useEffect, useState } from "react";
import { clientConfig } from "../../config/clientEnv";

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
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Existing Rules</h1>
            <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
                <thead className="bg-gray-100">
                <tr>
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Type</th>
                    <th className="border px-4 py-2">Value</th>
                    <th className="border px-4 py-2">Mode</th>
                    <th className="border px-4 py-2">Active</th>
                    <th className="border px-4 py-2">Delete</th>
                </tr>
                </thead>
                <tbody>
                    {rules.map((r) => (
                        <tr key={`${r.type}-${r.id}`}>
                            <td className="border px-4 py-2">{r.id}</td>
                            <td className="border px-4 py-2">{r.type}</td>
                            <td className="border px-4 py-2">{r.value}</td>
                            <td className="border px-4 py-2">{r.mode}</td>
                            <td className="border px-4 py-2">
                                {r.active ? "✅" : "❌"}
                                <button onClick={() => handleToggleActive(r)}>
                                    {r.active ? "Deactivate" : "Activate"}
                                </button>
                            </td>
                            <td className="border px-4 py-2">
                                <button onClick={() => handleDelete(r.value, r.type, r.mode)}>
                                    ❌
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
