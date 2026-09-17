pipeline {
    agent any

    environment {
        CI = 'true'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install --with-deps'
            }
        }

        stage('Run playwright Tests') {
            steps {
                // Runs the test
                bat 'npx playwright test'
            }
        }
    }

    post {
        always {
            // Archive playwright and allure results
            archiveArtifacts artifacts: 'playwright-report/**, allure-results/**', allowEmptyArchive: true
        }
    }
}