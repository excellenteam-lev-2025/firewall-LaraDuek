'use client';
import * as React from 'react';
import { useState } from 'react';

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
        `http://localhost:5000/api/firewall/${type}`,
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

      setSuccess(`Rules (${values.length}) added successfully`);
      setValues(['']); 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <label className="flex flex-col gap-1">
        Type:
        <select
          value={type}
          onChange={(e) => setType(e.target.value as any)}
          className="border rounded px-2 py-1"
        >
          <option value="ip">IP</option>
          <option value="url">URL</option>
          <option value="port">Port</option>
        </select>
      </label>

      <label className="flex flex-col gap-1">
        Mode:
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as any)}
          className="border rounded px-2 py-1"
        >
          <option value="whitelist">Whitelist</option>
          <option value="blacklist">Blacklist</option>
        </select>
      </label>

      <div className="flex flex-col gap-2">
        Value:
        {values.map((val, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            <input
              type={type === 'port' ? 'number' : 'text'}
              value={val}
              onChange={(e) => handleValueChange(idx, e.target.value)}
              required={idx === 0}
              className="border rounded px-2 py-1 flex-1"
              placeholder={type === 'port' ? 'Enter port number' : 'Enter value'}
            />
            {values.length > 1 && (
              <button
                type="button"
                onClick={() => removeField(idx)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addField}
          className="px-3 py-1 rounded-md bg-slate-100 text-slate-900 font-medium hover:bg-slate-200"
        >
          + Add another value
        </button>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 rounded-md bg-slate-900 text-white font-semibold hover:bg-slate-800 disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Rule(s)"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}
    </form>
  );
}
