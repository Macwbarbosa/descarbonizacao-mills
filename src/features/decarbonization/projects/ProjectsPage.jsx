import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Spin, Alert, Empty, Table, Tag, Select, message } from 'antd';
import { SaveOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons';
import { Card } from '@/shared/components/ui/Card';
import useProjectsStore from './store/useProjectsStore';
import useBauStore from '../bau/store/useBauStore';
import useDriversStore from '../drivers/store/useDriversStore';
import usePlanTargetsStore from '../targets-timeframe/store/usePlanTargetsStore';
import useTechnologyBankStore from '../../../store/technologyBankStore';
import { saveCompanyToProject } from '../shared/decarbonizationExport';
import { mergedInitiatives } from './utils/initiativeCatalog';
import { abatementInYear, coverageInYear, projectFinanceSummary } from './utils/projectAbatement';
import { metaNamesOf, projectMetaIds } from '../shared/metaScopes';

const NONE = '__none__';
const money = (v, c = 'BRL') => `${c} ${Number(v).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`;

/**
 * Abatimento com pelo menos 2 casas decimais. Para valores muito pequenos
 * (|v| < 0,01) usa notação científica — assim 0,00031 não vira "0".
 */
const fmtAbat = (v) => {
    const n = Number(v) || 0;
    if (n === 0) return '0,00';
    const abs = Math.abs(n);
    if (abs < 0.01) return n.toExponential(2).replace('.', ','); // ex.: 3,10e-4
    return n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

/**
 * Etapa 5 — Projetos de Descarbonização, em modo LISTA (tabela), separados por
 * META. Filtro de meta no topo + coluna "Metas". Clicar numa linha abre a tela
 * cheia do projeto (`/projects/:id`) com o editor e a Matriz de cobertura
 * filtrada pelos escopos da(s) meta(s). Ctrl/Cmd+clique abre em nova aba.
 */
function ProjectsPage() {
    const navigate = useNavigate();

    const projects = useProjectsStore((s) => s.projects);
    const bank = useProjectsStore((s) => s.bank);
    const loading = useProjectsStore((s) => s.loading);
    const error = useProjectsStore((s) => s.error);
    const loadProjects = useProjectsStore((s) => s.loadProjects);
    const addProject = useProjectsStore((s) => s.addProject);

    const activities = useBauStore((s) => s.activities);
    const targetYear = useBauStore((s) => s.targetYear);
    const loadActivities = useBauStore((s) => s.loadActivities);
    const drivers = useDriversStore((s) => s.drivers);
    const loadDrivers = useDriversStore((s) => s.loadDrivers);
    const { baseYear, netZeroYear } = usePlanTargetsStore((s) => s.params);
    const metas = usePlanTargetsStore((s) => s.metas);
    const loadPlanData = usePlanTargetsStore((s) => s.loadPlanData);
    const technologies = useTechnologyBankStore((s) => s.technologies);

    const [metaFilter, setMetaFilter] = useState(''); // '', metaId ou NONE
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadPlanData().catch(() => {});
        loadDrivers().catch(() => {});
        loadActivities().catch(() => {});
        loadProjects().catch(() => message.error('Erro ao carregar projetos.'));
    }, [loadPlanData, loadDrivers, loadActivities, loadProjects]);

    const initiatives = useMemo(() => mergedInitiatives(bank, technologies), [bank, technologies]);
    const initiativesById = useMemo(() => Object.fromEntries(initiatives.map((i) => [i.id, i])), [initiatives]);
    const metasById = useMemo(() => Object.fromEntries((metas || []).map((m) => [m.id, m])), [metas]);

    const ctx = useMemo(
        () => ({
            baseYear,
            endYear: netZeroYear,
            activitiesById: Object.fromEntries(activities.map((a) => [a.id, a])),
            driversById: Object.fromEntries(drivers.map((d) => [d.id, d])),
        }),
        [baseYear, netZeroYear, activities, drivers]
    );

    const scopesOf = (p) => [
        ...new Set((p.memberActivityIds || []).map((id) => ctx.activitiesById[id]?.scope).filter(Boolean)),
    ];

    const filtered = useMemo(() => {
        if (!metaFilter) return projects;
        if (metaFilter === NONE) return projects.filter((p) => projectMetaIds(p).length === 0);
        return projects.filter((p) => projectMetaIds(p).includes(metaFilter));
    }, [projects, metaFilter]);

    const openProject = (id, e) => {
        const url = `/projects/${id}`;
        if (e && (e.metaKey || e.ctrlKey)) window.open(url, '_blank');
        else navigate(url);
    };

    const handleAdd = () => {
        // Se um filtro de meta específico está ativo, já cria o projeto nessa meta.
        const metaIds = metaFilter && metaFilter !== NONE ? [metaFilter] : [];
        const id = addProject({ metaIds });
        if (id) navigate(`/projects/${id}`);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const data = await saveCompanyToProject();
            message.success(`Salvo no projeto: decarbonization-data/${data.cnpj}.json`);
        } catch (e) {
            message.warning('Salvo localmente. Para gravar o arquivo no projeto, rode em npm run dev.');
        } finally {
            setSaving(false);
        }
    };

    const metaFilterOptions = [
        { value: '', label: 'Todas as metas' },
        ...(metas || []).map((m) => ({ value: m.id, label: m.name })),
        { value: NONE, label: 'Sem meta' },
    ];

    const columns = [
        {
            title: 'Projeto',
            dataIndex: 'name',
            key: 'name',
            render: (name, p) => (
                <div>
                    <div className="font-semibold text-[#210856]">{name || '—'}</div>
                    <div className="text-[11px] text-gray-500">{initiativesById[p.initiativeId]?.name || 'sem iniciativa'}</div>
                </div>
            ),
            sorter: (a, b) => (a.name || '').localeCompare(b.name || ''),
        },
        {
            title: 'Metas',
            key: 'metas',
            width: 200,
            render: (_, p) => {
                const names = metaNamesOf(p, metasById);
                return names.length ? (
                    names.map((n) => (
                        <Tag key={n} color="purple" className="rounded-full m-0 mr-1 mb-1 text-[11px]">
                            {n}
                        </Tag>
                    ))
                ) : (
                    <span className="text-[12px] text-gray-400">sem meta</span>
                );
            },
        },
        {
            title: 'Escopos',
            key: 'scopes',
            width: 150,
            render: (_, p) => {
                const ss = scopesOf(p);
                return ss.length ? (
                    ss.map((s) => (
                        <Tag key={s} className="rounded-full m-0 mr-1 text-[10px]">
                            {s}
                        </Tag>
                    ))
                ) : (
                    <span className="text-[12px] text-gray-400">—</span>
                );
            },
        },
        {
            title: 'Ativ.',
            key: 'count',
            width: 80,
            align: 'right',
            render: (_, p) => <span className="tabular-nums">{(p.memberActivityIds || []).length}</span>,
            sorter: (a, b) => (a.memberActivityIds || []).length - (b.memberActivityIds || []).length,
        },
        {
            title: `Abrang. ${targetYear}`,
            key: 'coverage',
            width: 110,
            align: 'right',
            render: (_, p) => <span className="tabular-nums">{coverageInYear(p, targetYear).toFixed(0)}%</span>,
        },
        {
            title: `Abatimento ${targetYear} (tCO2e)`,
            key: 'abatement',
            width: 180,
            align: 'right',
            render: (_, p) => {
                const abat = abatementInYear(p, targetYear, initiativesById[p.initiativeId] || null, ctx);
                return <span className="tabular-nums">{abat > 0 ? '−' : ''}{fmtAbat(abat)}</span>;
            },
            sorter: (a, b) =>
                abatementInYear(a, targetYear, initiativesById[a.initiativeId] || null, ctx) -
                abatementInYear(b, targetYear, initiativesById[b.initiativeId] || null, ctx),
        },
        {
            title: 'Custo/tCO2e',
            key: 'cost',
            width: 140,
            align: 'right',
            render: (_, p) => {
                const f = projectFinanceSummary(p, initiativesById[p.initiativeId] || null, ctx);
                return <span className="tabular-nums text-gray-600">{money(Math.round(f.custoPorTon), f.currency)}</span>;
            },
        },
        {
            title: '',
            key: 'open',
            width: 44,
            align: 'center',
            render: () => <RightOutlined className="text-gray-300" />,
        },
    ];

    return (
        <div className="px-2 min-h-[calc(100vh-106px)]">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 gap-3">
                <div>
                    <div className="text-xs text-gray-500">
                        Plano de Descarbonização &nbsp;›&nbsp;{' '}
                        <span className="text-[#210856] font-medium">Projetos</span>
                    </div>
                    <h2 className="text-xl font-semibold text-[#210856] mt-1">Projetos de Descarbonização</h2>
                    <p className="text-sm text-gray-500">
                        Organize projetos por meta. Clique num projeto para editar e ver a matriz de cobertura
                        (restrita aos escopos da meta). Abatimento = grupo × abrangência × eficácia.
                    </p>
                </div>
                <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={handleSave}
                    loading={saving}
                    className="bg-[#210856] border-[#210856] hover:bg-[#2d0a6b] h-10 px-6"
                    size="large"
                >
                    Salvar no projeto (JSON)
                </Button>
            </div>

            {error && <Alert className="mb-4" type="error" showIcon message={error} />}

            <Spin spinning={loading}>
                <Card>
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[12px] text-gray-500">Meta:</span>
                            <Select
                                value={metaFilter}
                                onChange={setMetaFilter}
                                style={{ minWidth: 220 }}
                                options={metaFilterOptions}
                                showSearch
                                optionFilterProp="label"
                            />
                            <span className="text-[11px] text-gray-400">{filtered.length} projeto(s)</span>
                        </div>
                        <Button icon={<PlusOutlined />} onClick={handleAdd} className="text-[#210856]">
                            Novo projeto{metaFilter && metaFilter !== NONE ? ' nesta meta' : ''}
                        </Button>
                    </div>

                    <Table
                        rowKey="id"
                        columns={columns}
                        dataSource={filtered}
                        pagination={false}
                        scroll={{ x: 1000 }}
                        onRow={(p) => ({
                            onClick: (e) => openProject(p.id, e),
                            style: { cursor: 'pointer' },
                        })}
                        locale={{
                            emptyText: (
                                <div className="py-12">
                                    <Empty description={metaFilter ? 'Nenhum projeto nesta meta.' : 'Nenhum projeto ainda.'}>
                                        <Button
                                            type="primary"
                                            icon={<PlusOutlined />}
                                            onClick={handleAdd}
                                            className="bg-[#210856] border-[#210856]"
                                        >
                                            Novo projeto
                                        </Button>
                                    </Empty>
                                </div>
                            ),
                        }}
                    />
                </Card>
            </Spin>
        </div>
    );
}

export default ProjectsPage;
