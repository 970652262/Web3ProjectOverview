# Supabase 配置指南

## 1. 创建 Supabase 项目

1. 访问 [https://supabase.com](https://supabase.com) 并登录
2. 点击 "New Project" 创建新项目
3. 填写项目名称，设置数据库密码，选择区域

## 2. 创建数据库表

在 Supabase 控制台中，进入 "SQL Editor"，执行以下 SQL：

```sql
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  demo_url VARCHAR(500),
  tutorial_url VARCHAR(500),
  github_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 启用 RLS (Row Level Security)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 创建允许所有人读取的策略
CREATE POLICY "Allow public read" ON projects
  FOR SELECT USING (true);

-- 创建允许所有人插入的策略（生产环境建议添加身份验证）
CREATE POLICY "Allow public insert" ON projects
  FOR INSERT WITH CHECK (true);
```

## 3. 获取 API 密钥

1. 在 Supabase 控制台中，进入 "Settings" > "API"
2. 复制 "Project URL" 和 "anon public" 密钥

## 4. 配置环境变量

在项目根目录创建 `.env.local` 文件：

```env
NEXT_PUBLIC_SUPABASE_URL=你的_Project_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的_anon_public_密钥
```

## 5. 启动项目

```bash
npm run dev
```

访问 http://localhost:3000 即可看到页面！
