import app from "./app";

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});

// DATABASE_URL="postgresql://neondb_owner:npg_LreV9Zb3hcTx@ep-fragrant-block-ayxtq2ef-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
