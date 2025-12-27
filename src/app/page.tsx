'use client'

import { useState, useEffect } from 'react'
import { supabase, Project } from '@/lib/supabase'
import ProjectCard from '@/components/ProjectCard'
import AddProjectModal from '@/components/AddProjectModal'

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 获取项目列表
  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <div className="relative z-10 min-h-screen px-4 py-12 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 页头 */}
        <header className="text-center mb-16">
          {/* 装饰线 */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400" />
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Web3 项目导航
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            一登 Web3 课程作业项目展示平台，记录学习过程中的每一个项目
          </p>

          {/* 添加项目按钮 */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-green-500/20 border border-cyan-400/40 text-cyan-400 font-medium hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,217,255,0.3)] transition-all duration-300"
          >
            <svg
              className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            添加新项目
          </button>
        </header>

        {/* 项目列表 */}
        <main>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mb-4" />
              <p className="text-gray-400">加载中...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-800/50 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg mb-2">暂无项目</p>
              <p className="text-gray-600 text-sm">点击上方按钮添加你的第一个项目</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </main>

        {/* 页脚 */}
        <footer className="mt-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-gray-700" />
            <span className="text-gray-600 text-sm">YIDENG WEB3</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-gray-700" />
          </div>
          <p className="text-gray-600 text-xs">
            Powered by Next.js + Supabase + Tailwind CSS
          </p>
        </footer>
      </div>

      {/* 添加项目弹窗 */}
      <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchProjects}
      />
    </div>
  )
}
