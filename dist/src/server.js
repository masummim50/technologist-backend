import app from "./app";
async function main() {
    // console.log(prisma)
    app.listen(5000, () => {
        console.log('app running on port 5000');
    });
}
main();
