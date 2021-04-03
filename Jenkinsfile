def gitcommit

//Metodo para validar el qualityGate y enviar un correo si el QualityGate es menor a 70%
//Configurar en SonarQube el QualityGate con el porcentaje 70% y asignarlo al proyecto.
def qualityGateValidation(qg) {
    if(qg.status != 'OK') {
        emailext body: "La Cobertura del escaneo es menor a 70%", subject: "Error Sonar Scan, Quality Gate", to: "${EMAIL_ADDRESS}"
        return true
    }
    emailext body: "La Cobertura del escaneo es mas del 70% - SUCCESS", subject: "Info - Ejecucion pipeline", to: "${EMAIL_ADDRESS}"
    return false
}

pipeline {
    agent any
    
    tools {
        nodejs "nodejs"
    }
    
    environment {
        PROJECT_ROOT = "dist/"
        EMAIL_ADDRESS = "stiven.rodriguez@pragma.com.co"
        REGISTRY_URL = "https://registry.hub.docker.com"
        IMAGE_NAME = "api-users"
        VERSION = "0.0.1"

        
    }

    stages {
        stage("checkout"){
            steps {
                git 'https://github.com/merq-rodriguez/api-nestjs-jenkins'
                sh "git rev-parse --short HEAD > .git/commit-id"
                script{
                    gitcommit = readFile('.git/commit-id').trim()
                }
            }
        }
        
        stage('Test') {
            steps {
                echo "Iniciando test."
                script {
                    def containerTest = docker.image('node:12.22')
                    containerTest.pull()
                    containerTest.inside('--net=host'){
                        sh "npm install"
                        sh "npm run test"
                        sh "npm run test:cov"
                    }
                }
            }
        }

        stage("scan"){
            environment {
                scannerHome = tool 'sonar-scanner'
            }
            
            steps {
                withSonarQubeEnv('sonarqube') {
                    sh "${scannerHome}/bin/sonar-scanner \
                    -Dsonar.language=typescript \
                    -Dsonar.projectKey=nestjs-api:Test \
                    -Dsonar.projectName=nestjs-api \
                    -Dsonar.projectVersion=0.1 \
                    -Dsonar.sources=src \
                    -Dsonar.sourceEncoding=UTF-8 \
                    -Dsonar.exclusions=**/node_modules/** \
                    -Dsonar.tests=src \
                    -Dsonar.test.inclusions=**/*.spec.ts \
                    -Donar.typescript.lcov.reportPaths=coverage \
                    -Dsonar.testExecutionReportPaths=coverage/clover.xml"
                }
                
                timeout(time: 3, unit: 'MINUTES') {
                    //Sirve para detener la ejecucion si no es Success
                    waitForQualityGate abortPipeline: qualityGateValidation(waitForQualityGate())
                }
            }
        }

        stage('Build Image and Publish'){
            steps{
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                        def nuestraapp = docker.build("stiivcode/nodejsapp:${gitcommit}-${VERSION}", ".")
                        nuestraapp.push()
                    }
                }
            }
        }

    }
}

