'use client';
import * as React from 'react';
import { useState } from 'react';

export default function RulesAddition() {
  const [type, setType] = useState<'ip' | 'url' | 'port'>('ip');
  const [mode, setMode] = useState<'whitelist' | 'blacklist'>('whitelist');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`http://localhost:5000/api/firewall/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ values: [value], mode }),
      });

      if (!res.ok) throw new Error('Error creating rule');

      setSuccess(`Rule ${type} added successfully`);
      setValue('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8 }}>
      <label>
        Type:
        <select value={type} onChange={(e) => setType(e.target.value as any)}>
          <option value="ip">IP</option>
          <option value="url">URL</option>
          <option value="port">Port</option>
        </select>
      </label>

      <label>
        Mode:
        <select value={mode} onChange={(e) => setMode(e.target.value as any)}>
          <option value="whitelist">Whitelist</option>
          <option value="blacklist">Blacklist</option>
        </select>
      </label>

      <label>
        Value:
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Rule'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
}
