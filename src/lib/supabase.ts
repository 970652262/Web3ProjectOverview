import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 创建一个 mock client 用于未配置时
const createMockClient = () => ({
  from: () => ({
    select: () => ({
      order: () => Promise.resolve({ data: [], error: null }),
    }),
    insert: () => Promise.resolve({ data: null, error: { message: '请先配置 Supabase 环境变量' } }),
  }),
})

export const supabase: SupabaseClient | ReturnType<typeof createMockClient> =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : createMockClient()

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export interface Project {
  id?: number
  title: string
  description: string
  tutorial_url: string
  github_url: string
  demo_url: string
  created_at?: string
}
