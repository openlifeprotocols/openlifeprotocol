'use client'

import { useState } from 'react'
import clsx from 'clsx'

interface SchemaProperty {
  type?: string | string[]
  description?: string
  enum?: string[]
  required?: boolean
  examples?: any[]
  properties?: Record<string, SchemaProperty>
  items?: SchemaProperty
  format?: string
  pattern?: string
  minLength?: number
  maxLength?: number
  minimum?: number
  maximum?: number
}

interface Schema {
  title: string
  description?: string
  type: string
  properties: Record<string, SchemaProperty>
  required?: string[]
}

async function loadSchema(filename: string): Promise<Schema> {
  const response = await fetch(`/schemas/core/${filename}`)
  if (!response.ok) {
    throw new Error(`Failed to load schema: ${filename}`)
  }
  return response.json()
}

function PropertyBadge({ type, required }: { type?: string | string[]; required?: boolean }) {
  const typeStr = Array.isArray(type) ? type.join(' | ') : type
  return (
    <div className="flex gap-2 items-center">
      <span className="inline-block px-2 py-1 bg-sky-100 dark:bg-sky-900 text-sky-900 dark:text-sky-200 text-xs font-mono rounded">
        {typeStr || 'any'}
      </span>
      {required && (
        <span className="inline-block px-2 py-1 bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-200 text-xs font-bold rounded">
          required
        </span>
      )}
    </div>
  )
}

function PropertyRow({
  name,
  prop,
  required,
}: {
  name: string
  prop: SchemaProperty
  required?: boolean
}) {
  const [expanded, setExpanded] = useState(false)
  const hasNested = prop.properties || prop.items?.properties

  return (
    <div className="border-l-2 border-slate-200 dark:border-slate-700 pl-4 py-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            {hasNested && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              >
                {expanded ? '▼' : '▶'}
              </button>
            )}
            <code className="font-mono font-semibold text-slate-900 dark:text-slate-100">
              {name}
            </code>
          </div>
          {prop.description && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{prop.description}</p>
          )}
          <PropertyBadge type={prop.type} required={required} />

          {prop.enum && (
            <div className="mt-2 text-sm">
              <p className="font-semibold text-slate-700 dark:text-slate-300">Allowed values:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {prop.enum.map((val) => (
                  <code
                    key={val}
                    className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-2 py-1 rounded text-xs"
                  >
                    "{val}"
                  </code>
                ))}
              </div>
            </div>
          )}

          {prop.format && (
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Format: <code className="font-mono">{prop.format}</code>
            </p>
          )}

          {prop.pattern && (
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Pattern: <code className="font-mono text-xs">{prop.pattern}</code>
            </p>
          )}

          {prop.examples && prop.examples.length > 0 && (
            <div className="mt-2 text-sm">
              <p className="font-semibold text-slate-700 dark:text-slate-300">Example:</p>
              <pre className="bg-slate-50 dark:bg-slate-900 p-2 rounded mt-1 text-xs overflow-x-auto">
                <code className="text-slate-900 dark:text-slate-100">
                  {JSON.stringify(prop.examples[0], null, 2)}
                </code>
              </pre>
            </div>
          )}
        </div>
      </div>

      {expanded && hasNested && (
        <div className="mt-4 space-y-2">
          {prop.properties &&
            Object.entries(prop.properties).map(([key, value]) => (
              <PropertyRow key={key} name={key} prop={value} />
            ))}
          {prop.items?.properties &&
            Object.entries(prop.items.properties).map(([key, value]) => (
              <PropertyRow key={key} name={key} prop={value} />
            ))}
        </div>
      )}
    </div>
  )
}

export async function SchemaViewer({
  filename,
  title: customTitle,
}: {
  filename: string
  title?: string
}) {
  try {
    const schema = await loadSchema(filename)
    const title = customTitle || schema.title

    return (
      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
        <div className="mb-6">
          <h3 className="font-display text-2xl font-semibold text-slate-900 dark:text-white mb-2">
            {title}
          </h3>
          {schema.description && (
            <p className="text-slate-600 dark:text-slate-400">{schema.description}</p>
          )}
        </div>

        <div className="space-y-2">
          {schema.properties &&
            Object.entries(schema.properties).map(([key, value]) => (
              <PropertyRow
                key={key}
                name={key}
                prop={value}
                required={schema.required?.includes(key)}
              />
            ))}
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4 text-red-900 dark:text-red-200">
        <p className="font-semibold">Failed to load schema</p>
        <p className="text-sm">{(error as Error).message}</p>
      </div>
    )
  }
}
