import fs from "fs/promises";
import { Box, Typography, Button } from "@mui/material";
import Head from "next/head";

const cache: any = {};

export const getStaticProps = async (context: any) => {
  const numbering = context.params.numbering;
  console.log(numbering);

  const url = "https://raw.githubusercontent.com/oit-tools/syllabus-scraping/master/data/2022.json";
  const fileName = "data.json";
  let data: any;

  try {
    // ファイルがある場合は、ファイルからデータを取得する
    // ファイルを読み込んだら、cacheに保存する
    // 2回目以降は、cacheからデータを取得する
    if (cache[fileName]) {
      data = cache[fileName];
      console.log("Cache");
    } else {
      const file = await fs.readFile(fileName);
      data = JSON.parse(file.toString());
      cache[fileName] = data;
      console.log("Not cache");
    }
  } catch (error) {
    // ファイルがない場合は、データを取得する
    // データを取得したら、ファイルに保存する
    const res = await fetch(url);
    data = await res.json();
    await fs.writeFile(fileName, JSON.stringify(data));
    console.log("Not file");
  }
  const syllabus = data[numbering];

  return {
    props: { syllabus },
  };
};

export const getStaticPaths = async () => {
  const url =
    "https://raw.githubusercontent.com/oit-tools/syllabus-scraping/master/data/2022table.json";
  const res = await fetch(url);
  const syllabuses = await res.json();
  const paths = syllabuses.map((syllabus: any) => ({
    params: { numbering: syllabus.numbering },
  }));

  return {
    paths,
    fallback: false,
  };
};

const Syllabus = ({ syllabus }: any) => {
  return (
    <>
      <Head>
        <title>{syllabus.lecture_title} | OITシラバスアプリ</title>
        <meta
          property="og:title"
          content={`${syllabus.lecture_title} | OITシラバスアプリ`}
          key="title"
        />
        <meta
          property="og:description"
          content={`${syllabus.department}科 ${syllabus.year}年次 ${syllabus.term} ${syllabus.person}`}
          key="description"
        />
      </Head>

      <title>{syllabus.lecture_title}</title>
      <Box sx={{ width: "100%", maxWidth: "100%" }}>
        <Button
          variant="contained"
          color="primary"
          href={syllabus.url}
          target="_blank"
          sx={{ float: "right", margin: "10px" }}
        >
          公式シラバスへ
        </Button>

        <Typography component="div" sx={{ m: 1.5 }}>
          <Box sx={{ fontSize: "h4.fontSize" }}>
            {syllabus.lecture_title} | {syllabus.lecture_title_en}
          </Box>
          <Box sx={{ fontSize: "h5.fontSize", mt: 1 }}>
            {syllabus.department} | {syllabus.year}年次 | {syllabus.term} | {syllabus.credit}単位 |{" "}
            {syllabus.person} | {syllabus.numbering}
          </Box>
          <Box sx={{ fontSize: "h5.fontSize", mt: 1 }}>
            曜日: {syllabus.dow} | 時限: {syllabus.period}
          </Box>

          <Box sx={{ fontSize: "h5.fontSize", fontWeight: "bold", mt: 3 }}>授業のねらい・概要</Box>
          <Box sx={{ fontSize: "h6.fontSize", ml: 3 }}>{syllabus.aim}</Box>

          <Box sx={{ fontSize: "h5.fontSize", fontWeight: "bold", mt: 3 }}>テーマ</Box>
          <Box sx={{ fontSize: "h6.fontSize", ml: 3 }}>{syllabus.themes}</Box>

          <Box sx={{ fontSize: "h5.fontSize", fontWeight: "bold", mt: 3 }}>内容</Box>
          <Box sx={{ fontSize: "h6.fontSize", ml: 3 }}>{syllabus.contents}</Box>

          <Box sx={{ fontSize: "h5.fontSize", fontWeight: "bold", mt: 3 }}>予習/復習</Box>
          <Box sx={{ fontSize: "h6.fontSize", ml: 3 }}>{syllabus.preparations}</Box>

          <Box sx={{ fontSize: "h5.fontSize", fontWeight: "bold", mt: 3 }}>目標</Box>
          <Box sx={{ fontSize: "h6.fontSize", ml: 3 }}>{syllabus.target}</Box>

          <Box sx={{ fontSize: "h5.fontSize", fontWeight: "bold", mt: 3 }}>評価方法</Box>
          <Box sx={{ fontSize: "h6.fontSize", ml: 3 }}>{syllabus.method}</Box>

          <Box sx={{ fontSize: "h5.fontSize", fontWeight: "bold", mt: 3 }}>評価基準</Box>
          <Box sx={{ fontSize: "h6.fontSize", ml: 3 }}>{syllabus.basis}</Box>

          <Box sx={{ fontSize: "h5.fontSize", fontWeight: "bold", mt: 3 }}>教科書</Box>
          <Box sx={{ fontSize: "h6.fontSize", ml: 3 }}>{syllabus.textbook}</Box>

          <Box sx={{ fontSize: "h5.fontSize", fontWeight: "bold", mt: 3 }}>参考書</Box>
          <Box sx={{ fontSize: "h6.fontSize", ml: 3 }}>{syllabus.reference_book}</Box>

          <Box sx={{ fontSize: "h5.fontSize", fontWeight: "bold", mt: 3 }}>受講心得</Box>
          <Box sx={{ fontSize: "h6.fontSize", ml: 3 }}>{syllabus.knowledge}</Box>

          <Box sx={{ fontSize: "h5.fontSize", fontWeight: "bold", mt: 3 }}>オフィスアワー</Box>
          <Box sx={{ fontSize: "h6.fontSize", ml: 3 }}>{syllabus.office_hour}</Box>

          <Box sx={{ fontSize: "h5.fontSize", fontWeight: "bold", mt: 3 }}>実践的教育</Box>
          <Box sx={{ fontSize: "h6.fontSize", ml: 3 }}>{syllabus.practice}</Box>

          <Box sx={{ fontSize: "h5.fontSize", fontWeight: "bold", mt: 3 }}>CSコース</Box>
          <Box sx={{ fontSize: "h6.fontSize", ml: 3 }}>{syllabus.cs}</Box>

          <Box sx={{ fontSize: "h5.fontSize", fontWeight: "bold", mt: 3 }}>スパイラル型教育</Box>
          <Box sx={{ fontSize: "h6.fontSize", ml: 3 }}>{syllabus.spiral}</Box>
        </Typography>
      </Box>
    </>
  );
};

export default Syllabus;