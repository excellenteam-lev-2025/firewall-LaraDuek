import { api, prefix } from './helpers/request';

describe('System happy flow (end-to-end)', () => {
  it('add and delete IP, Port and URL; query rules', async () => {
    // 1) Add IP (whitelist)
    const ipBody = { values: ['7.7.7.7'], mode: 'whitelist' as const };
    const ipAdd = await api().post(`${prefix}/ip`).send(ipBody);
    expect(ipAdd.status).toBeLessThan(400);

    // 2) Add Port (blacklist)
    const portBody = { values: [22], mode: 'blacklist' as const };
    const portAdd = await api().post(`${prefix}/port`).send(portBody);
    expect(portAdd.status).toBeLessThan(400);

    // 3) Add URL (whitelist)
    const urlBody = { values: ['ok.test'], mode: 'whitelist' as const };
    const urlAdd = await api().post(`${prefix}/url`).send(urlBody);
    expect(urlAdd.status).toBeLessThan(400);

    // 4) Query rules (GET /rules)
    const rulesGet = await api().get(`${prefix}/rules`);
    expect(rulesGet.status).toBeLessThan(400);
    expect(typeof rulesGet.body).toBe('object');

    // 5) Delete added items (DELETE)
    const ipDel = await api().delete(`${prefix}/ip`).send(ipBody);
    expect(ipDel.status).toBeLessThan(400);

    const portDel = await api().delete(`${prefix}/port`).send(portBody);
    expect(portDel.status).toBeLessThan(400);

    const urlDel = await api().delete(`${prefix}/url`).send(urlBody);
    expect(urlDel.status).toBeLessThan(400);
  });
});
