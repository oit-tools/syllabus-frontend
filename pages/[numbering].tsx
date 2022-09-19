import { Button, Box, Typography } from "@mui/material";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const numbering = context.params?.numbering;
    const url = `https://syllabus-api.deno.dev/${numbering}`;
    const res = await fetch(url);
    const data = await res.json();

    return {
        props: {
            data,
        },
    };
};

const Syllabus = ({data}: any) => {
    return (
        <>
            <Box sx={{ width: "100%", maxWidth: "100%" }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        window.close();
                    }}
                >
                    閉じる
                </Button>

                <Typography variant="h6">
                    {data.lecture_title}
                </Typography>
                <Typography variant="h6">
                    {data.lecture_title_en}
                </Typography>
                <Typography variant="h6">
                    {data.year}
                </Typography>
                <Typography variant="h6">
                    {data.credit}
                </Typography>
                <Typography variant="h6">
                    {data.term}
                </Typography>
                <Typography variant="h6">
                    {data.person}
                </Typography>
                <Typography variant="h6">
                    {data.numbering}
                </Typography>
                <Typography variant="h6">
                    {data.department}
                </Typography>
                <Typography variant="h6">
                    {data.url}
                </Typography>
                <Typography variant="h6">
                    {data.dow}
                </Typography>
                <Typography variant="h6">
                    {data.period}
                </Typography>
                <Typography variant="h6">
                    {data.aim}
                </Typography>
                <Typography variant="h6">
                    {data.cs}
                </Typography>
                <Typography variant="h6">
                    {data.spiral}
                </Typography>
                <Typography variant="h6">
                    {data.target}
                </Typography>
                <Typography variant="h6">
                    {data.method}
                </Typography>
                <Typography variant="h6">
                    {data.basis}
                </Typography>
                <Typography variant="h6">
                    {data.textbook}
                </Typography>
                <Typography variant="h6">
                    {data.reference_book}
                </Typography>
                <Typography variant="h6">
                    {data.knowledge}
                </Typography>
                <Typography variant="h6">
                    {data.office_hour}
                </Typography>
                <Typography variant="h6">
                    {data.practice}
                </Typography>
            </Box>
        </>
    )
}

export default Syllabus