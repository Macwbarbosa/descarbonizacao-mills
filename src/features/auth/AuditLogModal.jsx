import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Table, Tag, Button, Select } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { fetchAudit } from '@/features/decarbonization/shared/decarbonizationAudit';
import { formatCnpj } from '@/features/decarbonization/shared/decarbonizationStorage';

const fmtDateTime = (iso) => {
    try {
        return new Date(iso).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
    } catch (e) {
        return iso || '—';
    }
};

/**
 * Log de alterações (somente leitura) — quem salvou qual empresa e quando.
 * Visível apenas para o administrador (ver gate no App). Não restaura versões.
 */
function AuditLogModal({ open, onClose }) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [empresaFilter, setEmpresaFilter] = useState('');

    const load = async () => {
        setLoading(true);
        const data = await fetchAudit({ limit: 500 });
        setRows(data);
        setLoading(false);
    };

    useEffect(() => {
        if (open) load();
    }, [open]);

    const empresas = [...new Set(rows.map((r) => r.cnpj).filter(Boolean))];
    const filtered = empresaFilter ? rows.filter((r) => r.cnpj === empresaFilter) : rows;

    const columns = [
        {
            title: 'Quando',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 160,
            render: (v) => <span className="tabular-nums">{fmtDateTime(v)}</span>,
        },
        {
            title: 'Usuário',
            dataIndex: 'user_email',
            key: 'user_email',
            render: (v) => v || <span className="text-gray-400">—</span>,
        },
        {
            title: 'Empresa',
            key: 'empresa',
            render: (_, r) => (
                <div>
                    <div>{r.empresa || '—'}</div>
                    {r.cnpj && <div className="text-[11px] text-gray-400">{formatCnpj(r.cnpj)}</div>}
                </div>
            ),
        },
        {
            title: 'Ação',
            dataIndex: 'action',
            key: 'action',
            width: 110,
            render: (v) => <Tag className="rounded-full">{v || 'save'}</Tag>,
        },
    ];

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width={760}
            title="Histórico de alterações"
        >
            <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
                <span className="text-xs text-gray-500">
                    {filtered.length} registro(s) — somente leitura (quem salvou, qual empresa, quando).
                </span>
                <div className="flex items-center gap-2">
                    <Select
                        value={empresaFilter}
                        onChange={setEmpresaFilter}
                        size="small"
                        style={{ minWidth: 200 }}
                        options={[
                            { value: '', label: 'Todas as empresas' },
                            ...empresas.map((c) => ({ value: c, label: formatCnpj(c) })),
                        ]}
                    />
                    <Button size="small" icon={<ReloadOutlined />} onClick={load} loading={loading}>
                        Atualizar
                    </Button>
                </div>
            </div>
            <Table
                rowKey={(r) => r.id || `${r.cnpj}-${r.created_at}`}
                columns={columns}
                dataSource={filtered}
                loading={loading}
                size="small"
                pagination={{ pageSize: 15, showSizeChanger: false }}
                scroll={{ y: 420 }}
            />
        </Modal>
    );
}

AuditLogModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AuditLogModal;
