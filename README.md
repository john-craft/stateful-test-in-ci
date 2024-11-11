# Stateful Validation of Database Migrations

This application is a demonstration of how to validate database migrations will succeed before being run in production environments. The application uses real, anonymized production data to verify migrations work and don't fail against outlier data.

## Overview
This sample app runs a GitHub workflow to verify success when pull requests contain database migration code.
The app uses a GitHub workflow, `test-migration.yml`, to coordinate everything. The  worklow detects when migration changes in pull requests exist and runs the database container with a full copy of production data against which migrations can be tested. The success or failure of the migration is added as a comment to the pull request. 

## Assumptions
* This app assumes there is a `pg_dump` from PostgreSQL stored in a Google Cloud Storage (GCS) bucket.
* This is a Node app and uses [Sequelize](https://sequelize.org/) to run the database migration.
* The workflow variable `DB_BACKUP_URL` needs to be pointed at the bucket containing the backup.
* This app loads the database backup into a PostgreSQL container when the workflow `test-migration` runs. If the data is exceptionally large, it may not load in time.
