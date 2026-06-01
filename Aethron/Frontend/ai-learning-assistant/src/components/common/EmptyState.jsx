import React from 'react'
import { FileText, Plus } from 'lucide-react'
import Button from './Button'

const EmptyState = ({onActionClick, title, description, buttonText}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-gradient-to-br from-slate-50/50 to-white border-2 border-dashed border-slate-200 rounded-3xl">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-teal-100 mb-6">
            <FileText className="w-8 h-8 text-slate-400" strokeWidth={2} />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
        <p className="text-sm text-slate-500 mb-8 max-w-sm leading-relaxed">{description}</p>
        {buttonText && onActionClick && (
            <Button onClick={onActionClick}>
                <Plus className="w-4 h-4" strokeWidth={2.5} />
                {buttonText}
            </Button>
        )}
    </div>
  )
}

export default EmptyState
