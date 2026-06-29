import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@/shared/components/ui/Card';

/**
 * Seção de ETAPA dentro de um projeto. Cada etapa é um card com cabeçalho
 * destacado (número + título em caixa alta/bold), deixando claro que são passos
 * distintos da construção do projeto.
 */
function StepSection({ step, title, hint, extra, children }) {
    return (
        <Card className="mb-4">
            <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#210856] text-white text-[13px] font-bold shrink-0">
                        {step}
                    </span>
                    <div>
                        <h3 className="climoo-heading text-[15px] font-bold uppercase tracking-wide text-[#210856] leading-tight m-0">
                            {title}
                        </h3>
                        {hint && <p className="text-[12px] text-gray-500 normal-case m-0 mt-0.5">{hint}</p>}
                    </div>
                </div>
                {extra && <div className="shrink-0">{extra}</div>}
            </div>
            {children}
        </Card>
    );
}

StepSection.propTypes = {
    step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.string.isRequired,
    hint: PropTypes.node,
    extra: PropTypes.node,
    children: PropTypes.node.isRequired,
};

StepSection.defaultProps = { hint: null, extra: null };

export default StepSection;
