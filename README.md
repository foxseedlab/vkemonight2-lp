# バーチャルケモナイト LP
2025年7月12日に開催予定の「バーチャルケモナイト」のWebページ（ランディングページ）です。

## 🛠 環境構築
開発には以下が必要です。

- Node.js v22.17.1 以上
- microCMS APIキー

はじめにリポジトリをクローンし、依存関係をインストールしてください。

```sh
git clone https://github.com/foxseedlab/vkemonight2-lp.git

cd vkemonight2-lp

npm install
```

次に .env.sample を .env にコピーし、環境変数の設定を行ってください。

```sh
cp .env.sample .env
```

### 本番環境用シークレットの設定
本番環境では、機密情報を Cloudflare Workers のシークレットとして設定する必要があります。
wrangler.jsonc に記載されていない環境変数は、以下のコマンドで設定してください。

```sh
# microCMS関連
wrangler secret put MICROCMS_SERVICE_DOMAIN
wrangler secret put MICROCMS_API_KEY

# Google Analytics関連
wrangler secret put PUBLIC_GOOGLE_SITE_VERIFICATION
wrangler secret put PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID

# Basic認証（必要な場合）
wrangler secret put BASIC_AUTH_USER
wrangler secret put BASIC_AUTH_PASSWORD
```

各コマンド実行時に、値の入力が求められます。

## 💻 コマンド
| コマンド | 説明 |
| --- | --- |
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | ビルド |
| `npm run preview` | ビルドしたファイルをプレビュー |

## 🔀 ブランチ戦略
[GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow) を採用しています。

## 🚀 本番環境へのデプロイ
mainブランチにマージすると、 Cloudflare Pages にデプロイするアクションが自動的に実行されます。
Cloudflare Pages で静的にHTMLを生成(SSG)し、CDNで配信します。

## 📁 リポジトリ構造
```sh
/
├── .astro/                # Astroの型定義など
├── dist/                  # ビルド出力先
├── public/                # 静的ファイル（画像、フォントなど）
├── src/                   # ソースコード
│   ├── assets/            # アセットファイル
│   ├── components/        # ページのアイランド（コンポーネント）
│   ├── layouts/           # ページレイアウト
│   ├── libs/              # 汎用コンポーネントや関数
│   ├── pages/             # ページ
│   └── styles/            # CSSスタイル
├── astro.config.mjs       # Astro設定ファイル
├── biome.jsonc            # Biome設定ファイル
├── tsconfig.json          # TypeScript設定
├── package.json           # 依存関係とスクリプト
└── wrangler.toml          # Cloudflare Pagesの設定
```

## 👾 LP評価プロンプト集
コードエディタCursorからプロンプトを実行し、AIによるLPの評価を行います。
多くの出演者やゲストの情報をページに載せるため、不適切な文章や構成が絶対に含まれていてはいけません。
定期的に以下プロンプトを実行してください。

### aria.md
ARIA属性の一覧を提供しています。アクセシビリティ評価の際に参照するために使用します。ウィジェット属性、ライブリージョン属性、ドラッグ＆ドロップ属性、リレーションシップ属性、グローバルARIA属性などが含まれています。

### check-language.md
サイトに書かれている内容の言語使用について評価するためのプロンプトです。読みやすさ、明確さ、包括性、イベント情報の明確さなどの観点から分析します。

### control-a11y-mobile.md
モバイル環境でページをコントロールする際のアクセシビリティを評価するためのプロンプトです。タッチ操作、スクロール操作、色のコントラスト、モバイル特有の考慮事項などを確認します。

### control-a11y-pc.md
PC環境でページをコントロールする際のアクセシビリティを評価するためのプロンプトです。キーボードアクセシビリティ、スクロール操作、色のコントラストなどを確認します。

### general-a11y.md
ゲストやイベント参加者など多様性のあるユーザーにとって適切なアクセシビリティかどうかを分析するための一般的なアクセシビリティ評価プロンプトです。ARIA属性、WAI-ARIA、フォーカス可能な要素、キーボードナビゲーション、コントラスト比などを考慮します。

### general-uiux.md
スマホとPCの両方のブラウザサイズでページ全体のスクリーンショットを撮影し、UI/UXを評価するためのプロンプトです。視覚的階層、レイアウト、ユーザーフローなどを分析します。

<div align="center">
<small>
© 2025 KEMO IN THE DARK, ふぉくしーど
</small>
</div>
