# Baby Steps Deployment Guide for Akyliya Website

This guide will walk you through deploying your Next.js website to Vercel and connecting it to a Neon (PostgreSQL) database.

## Prerequisites
- A GitHub account ([Sign up here](https://github.com/join))
- A Vercel account ([Sign up here](https://vercel.com/signup))
- A Neon account ([Sign up here](https://neon.tech/))

---

## Step 1: Push Your Code to GitHub
We need to put your code online so Vercel can access it.

1.  **Log in to GitHub** and click the **+** icon in the top-right corner, then select **New repository**.
2.  **Name your repository** (e.g., `akyliya-website`).
3.  Make it **Private** (recommended) or Public.
4.  Click **Create repository**.
5.  **Copy the commands** shown under the section "...or push an existing repository from the command line". They will look like this:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/akyliya-website.git
    git branch -M main
    git push -u origin main
    ```
6.  **Run those commands** in your VS Code terminal (I can help you run these if you provide the URL from step 5).

---

## Step 2: Set Up Your Database on Neon
We need a place to store your blogs, services, and form submissions.

1.  **Log in to Neon** console.
2.  Click **New Project**.
3.  Name it `akyliya-db` and click **Create Project**.
4.  Once created, you will see a **Connection String** on the dashboard. It looks like:
    `postgres://neondb_owner:AbC123...@ep-cool-frog.aws.neon.tech/neondb?sslmode=require`
5.  **Copy this string**. You will need it for Step 3.

---

## Step 3: Deploy to Vercel
Now we connect everything and put the site live.

1.  **Log in to Vercel**.
2.  Click **Add New...** > **Project**.
3.  You should see your GitHub repository `akyliya-website` listed. Click **Import**.
4.  **Configure Project**:
    *   **Framework Preset**: It should auto-detect "Next.js".
    *   **Root Directory**: Leave as `./`.
5.  **Environment Variables** (Crucial Step!):
    Click to expand the "Environment Variables" section. Add the following **three** variables:

    | Name | Value |
    | :--- | :--- |
    | `DATABASE_URL` | Paste the **Neon Connection String** you copied in Step 2. |
    | `ADMIN_PASSWORD` | Choose a secure password for your admin panel (e.g., `MySecurePass123!`). |
    | `ADMIN_SECRET_TOKEN` | Type a random long string (e.g., `s3cr3t-t0k3n-akyliya-99`). |

6.  Click **Deploy**.
    *   Vercel will now build your website. This takes about 1-2 minutes.
    *   Wait for the confetti! 🎉

---

## Step 4: Initialize the Database
Your site is live, but the database is empty. We need to create the tables.

1.  Go to your Vercel Project Dashboard.
2.  Click on the **Settings** tab (top menu).
3.  On the left sidebar, click **Deployment Protection** (or just go to the **Deployments** tab if that's easier).
4.  Actually, the easiest way is to run this from your **local computer**:
    *   Open your `.env` file in VS Code.
    *   Update `DATABASE_URL` with your **Neon Connection String** (the one you copied).
    *   Run this command in your VS Code terminal:
        ```bash
        npx prisma migrate deploy
        ```
    *   This will send the table structure to your live Neon database.

---

## Step 5: Verify
1.  Visit your new Vercel URL (e.g., `https://akyliya-website.vercel.app`).
2.  Go to `/admin`.
3.  Login with the `ADMIN_PASSWORD` you set in Step 3.
4.  Start adding blogs and services!
