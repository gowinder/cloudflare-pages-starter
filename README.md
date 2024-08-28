# 使用 nestjs+honojs+drizzle+shadcnui 开发部署在 cloudflare pages 上的 web app

## 使用方法

- `Fork`本项目,
- `Cloudflare D1` 数据库开通
- `wrangler.toml` 配置好`预览`,`生产`环境的`D1`数据库`id`
- `wrangler.toml` 配置好`预览`,`生产`环境的`NEXT_PUBLIC_APP_URL`
- `Cloudflare Pages` 新建项目,使用`github repo`, 选择你的`Fork`后的项目.
- `Pages`的`仪表盘`中, `设置`-`环境变量`,填入`github`, `google`相关的`client id`和`client secret`(如果需要第三方登入的话), 填入`AUTH_SECRET`
- `设置`-`构建和部署`中, 生产选`master`或者`main`分支, 预览选`develop`分支
- 提交`develop`分支就会自动构建`预览`环境, 提交`master`或者`main`分支就会自动构建`生产`环境
