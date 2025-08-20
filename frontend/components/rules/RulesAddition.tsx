'use client';

import * as React from 'react';
import { useState } from 'react';
import { clientConfig } from '../../config/clientEnv';
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {  Card,  CardHeader,  CardTitle,  CardContent,  CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RulesAddition() {
  const [type, setType] = useState<'ip' | 'url' | 'port'>('ip');
  const [mode, setMode] = useState<'whitelist' | 'blacklist'>('whitelist');
  const [values, setValues] = useState<string[]>(['']); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleValueChange = (index: number, newVal: string) => {
    const newValues = [...values];
    newValues[index] = newVal;
    setValues(newValues);
  };

  const addField = () => setValues([...values, '']);
  const removeField = (index: number) =>
    setValues(values.filter((_, i) => i !== index));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        values: values
          .filter((v) => v.trim() !== '')
          .map((v) => (type === 'port' ? Number(v) : v.trim())),
        mode,
      };

      const res = await fetch(
        `${clientConfig.apiBase}/${type}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        let message = `Request failed (${res.status})`;
        try {
          const data = await res.json();
          if (data?.error) message = data.error;
          else if (data?.message) message = data.message;
        } catch {
          const text = await res.text();
          if (text) message = text;
        }
        throw new Error(message);
      }

      setSuccess(`Rules (${values.filter((v) => v.trim() !== '').length}) added successfully`);
      setValues(['']); 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Add Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="flex flex-col gap-1">
              <Label>Type</Label>
              <Select value={type} onValueChange={(val) => setType(val as any)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ip">IP</SelectItem>
                  <SelectItem value="url">URL</SelectItem>
                  <SelectItem value="port">Port</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <Label>Mode</Label>
              <Select value={mode} onValueChange={(val) => setMode(val as any)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="whitelist">Whitelist</SelectItem>
                  <SelectItem value="blacklist">Blacklist</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Values</Label>
              {values.map((val, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <Input
                    type={type === 'port' ? 'number' : 'text'}
                    value={val}
                    onChange={(e) => handleValueChange(idx, e.target.value)}
                    required={idx === 0}
                    placeholder={type === 'port' ? 'Enter port number' : 'Enter value'}
                  />
                  {values.length > 1 && (
                    <Button type="button" onClick={() => removeField(idx)} variant="destructive">
                      ✕
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" onClick={addField} variant="secondary">
                + Add another value
              </Button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Adding..." : "Add Rule(s)"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
