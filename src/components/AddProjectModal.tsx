'use client'

import { useState } from 'react'
import { supabase, Project } from '@/lib/supabase'

interface AddProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function AddProjectModal({ isOpen, onClose, onSuccess }: AddProjectModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    demo_url: '',
    tutorial_url: '',
    github_url: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('projects')
        .insert([formData])

      if (error) throw error

      setFormData({ title: '', description: '', demo_url: '', tutorial_url: '', github_url: '' })
      onSuccess()
      onClose()
    } catch (error) {
      console.error('Error adding project:', error)
      alert('添加项目失败，请检查 Supabase 配置')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 背景遮罩 */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 弹窗内容 */}
      <div className="relative w-full max-w-lg glass rounded-2xl p-6 border border-cyan-400/30 shadow-[0_0_50px_rgba(0,217,255,0.2)]">
        {/* 装饰边框 */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-400 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyan-400 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-cyan-400 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-400 rounded-br-2xl" />

        {/* 标题 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold gradient-text">添加新项目</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 表单 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-cyan-400 mb-2">
              项目名称 *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-black/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:shadow-[0_0_15px_rgba(0,217,255,0.2)] transition-all"
              placeholder="输入项目名称"
            />
          </div>

          <div>
            <label className="block text-sm text-cyan-400 mb-2">
              项目描述 *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-black/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:shadow-[0_0_15px_rgba(0,217,255,0.2)] transition-all resize-none"
              placeholder="简单描述你的项目"
            />
          </div>

          <div>
            <label className="block text-sm text-cyan-400 mb-2">
              部署链接
            </label>
            <input
              type="url"
              value={formData.demo_url}
              onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
              className="w-full px-4 py-3 bg-black/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:shadow-[0_0_15px_rgba(0,217,255,0.2)] transition-all"
              placeholder="https://your-project.vercel.app"
            />
          </div>

          <div>
            <label className="block text-sm text-cyan-400 mb-2">
              教程链接
            </label>
            <input
              type="url"
              value={formData.tutorial_url}
              onChange={(e) => setFormData({ ...formData, tutorial_url: e.target.value })}
              className="w-full px-4 py-3 bg-black/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:shadow-[0_0_15px_rgba(0,217,255,0.2)] transition-all"
              placeholder="https://example.com/tutorial"
            />
          </div>

          <div>
            <label className="block text-sm text-cyan-400 mb-2">
              GitHub 链接
            </label>
            <input
              type="url"
              value={formData.github_url}
              onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
              className="w-full px-4 py-3 bg-black/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:shadow-[0_0_15px_rgba(0,217,255,0.2)] transition-all"
              placeholder="https://github.com/username/repo"
            />
          </div>

          {/* 按钮 */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-lg border border-gray-600/50 text-gray-400 hover:text-white hover:border-gray-500 transition-all"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-green-500 text-black font-semibold hover:shadow-[0_0_20px_rgba(0,217,255,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  添加中...
                </span>
              ) : '添加项目'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
