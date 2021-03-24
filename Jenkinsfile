pipeline {
    agent any
    tools {
        nodejs "nodejs"
    }
    environment {
        PROJECT_ROOT = "dist/"
        EMAIL_ADDRESS = "stiven.rodriguez@pragma.com.co"
    }
    stages {
        stage("checkout"){
            steps {
                git 'https://github.com/merq-rodriguez/api-nestjs-jenkins'
            }
        }
        stage("build"){
            steps{
                sh "npm install"
                sh "npm run build"
            }
        }

        stage("test"){
          steps{
            sh "npm run test"
          }
        }

        stage("scan"){
            environment {
                scannerHome = tool 'sonar-scanner'
            }
             steps {
                    withSonarQubeEnv('sonarqube') {
                        sh "${scannerHome}/bin/sonar-scanner \
                        -Dsonar.language=ts \
                        -Dsonar.webhooks.project=http://jenkins:8080/sonarqube-webhook \
                        -Dsonar.projectKey=nestjs-api:Test \
                        -Dsonar.projectName=nestjs-api \
                        -Dsonar.projectVersion=0.1 \
                        -Dsonar.sources=src \
                        -Dsonar.sourceEncoding=UTF-8 \
                        -Dsonar.exclusions=**/node_modules/** \
                        -Dsonar.tests=src \
                        -Dsonar.test.inclusions=**/*.spec.ts"
                    }
                    timeout(time: 5, unit: 'MINUTES') {
                        //Sirve para detener la ejecucion si no es Success
                        waitForQualityGate abortPipeline: qualityGateValidation(waitForQualityGate())
                    }
            }
        }
    }
}

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