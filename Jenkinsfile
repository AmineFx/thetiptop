pipeline {
    agent any

    

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                    sh 'docker build -t abdeladembiyi/thetiptop5:${BRANCH_NAME} .'
            }
        }

        stage('Run Frontend Tests') {
            steps {
                    // Ajoutez ici les commandes pour exécuter les tests frontend.
                    // Par exemple, si vous utilisez un framework de test comme Jest :
                    sh 'npm install' // Assurez-vous d'installer les dépendances de test si nécessaire.
                    sh 'npm run test'
            }
        }

        stage('Push Frontend Image to Docker Hub') {
            steps {
                    sh 'docker push abdeladembiyi/thetiptop5:${BRANCH_NAME}'
            }
        }

        stage('Frontend Deployment') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'dev') {
                        echo "Deploying Frontend to Development environment"
                        // Ajoutez ici les commandes spécifiques pour déployer votre frontend en développement
                    } else if (env.BRANCH_NAME == 'preProd') {
                        echo "Deploying Frontend to Staging environment"
                        // Ajoutez ici les commandes spécifiques pour déployer votre frontend en staging
                    } else if (env.BRANCH_NAME == 'prod') {
                        echo "Deploying Frontend to Production environment"
                        // Ajoutez ici les commandes spécifiques pour déployer votre frontend en production
                    } else {
                        echo "This is an unrecognized branch: ${BRANCH_NAME}"
                    }
                }
            }
        }
    }
}
