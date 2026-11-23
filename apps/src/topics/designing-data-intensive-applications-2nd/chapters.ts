/** このトピックの URL の階層（/et-cetera/<これ>/）。src/routes/ と public/ の下のフォルダ名と同じ */
export const TOPIC_PATH = 'designing-data-intensive-applications-2nd';

/**
 * 図解ページ1本ぶん。
 * 中身はルーターを通さない静的な HTML で、apps/public/<TOPIC_PATH>/<slug>/index.html に置いている。
 */
export type ChapterPage = {
  /** URL の最後の部分。apps/public/<TOPIC_PATH>/ の下のフォルダ名と同じ */
  slug: string;
  /** 「1.2」「2章」などの番号 */
  label: string;
  title: string;
  description: string;
};

/** 目次に並べる図解ページ。章を足したらここに1件追加する */
export const CHAPTER_PAGES: readonly ChapterPage[] = [
  {
    slug: 'ch1-2',
    label: '1.2',
    title: 'クラウドとセルフホスティング',
    description: '作るか借りるか。クラウドネイティブ、ストレージとコンピュートの分離、運用の変わり方。',
  },
  {
    slug: 'ch1-3',
    label: '1.3',
    title: '分散システムと単一ノードシステム',
    description: '分散する理由とそのツケ。マイクロサービスとサーバーレス、クラウドとスパコン。',
  },
  {
    slug: 'ch1-4',
    label: '1.4',
    title: 'データシステム、法律、そして社会',
    description: 'GDPR、忘れられる権利と追記専用のログ、データを持つことの本当のコスト。',
  },
  {
    slug: 'ch2',
    label: '2章',
    title: '非機能要件を定義する',
    description: 'タイムラインの事例、パーセンタイルとテールレイテンシ、信頼性、スケーラビリティ、メンテナンス性。',
  },
  {
    slug: 'ch3',
    label: '3章',
    title: 'データモデルとクエリ言語',
    description: 'リレーショナルとドキュメント、グラフ、イベントソーシングとCQRS、データフレーム。',
  },
  {
    slug: 'ch4',
    label: '4章',
    title: 'ストレージと検索',
    description: 'LSMツリーとBツリー、列指向ストレージ、全文検索とベクトル検索。',
  },
  {
    slug: 'ch5',
    label: '5章',
    title: 'エンコーディングと発展性',
    description: '後方互換と前方互換。JSON、Protocol Buffers、Avro と、データの流れ方。',
  },
  {
    slug: 'ch6',
    label: '6章',
    title: 'レプリケーション',
    description: 'シングルリーダー、マルチリーダー、リーダーレス。レプリケーションラグとクォーラム。',
  },
  {
    slug: 'ch7',
    label: '7章',
    title: 'シャーディング',
    description: 'キー範囲とハッシュ、リバランシング、リクエストルーティング、セカンダリインデックス。',
  },
  {
    slug: 'ch8',
    label: '8章',
    title: 'トランザクション',
    description: 'ACID の意味、弱い分離レベルで起きる事故、シリアライザブル、分散トランザクション。',
  },
  {
    slug: 'ch9',
    label: '9章',
    title: '分散システムの厄介な問題',
    description: '部分障害、信頼できないネットワークとクロック、クォーラムとフェンシングトークン。',
  },
];
