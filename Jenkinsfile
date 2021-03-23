pipeline {
    agent any
    tools {
        tools {nodejs "nodejs"}
    }
    environment {
        PROJECT_ROOT = "dist/"
        EMAIL_ADDRESS = "stiven.rodriguez@pragma.com.co"
    }
    stages {
        stage("checkout"){
            steps {
                git 'http://github'
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
                    //sh 'mvn clean install sonar:sonar'
                    withSonarQubeEnv('sonarqube') {
                        sh "${scannerHome}/bin/sonar-scanner \
                        -Dsonar.projectKey=practicaJava:Test \
                        -Dsonar.projectName=practicaJava \
                        -Dsonar.projectVersion=0.1 \
                        -Dsonar.sources=practica-devops/src \
                        -Dsonar.java.binaries=./${PROJECT_ROOT}target/"
                        //sh "mvn -f practica-devops/ sonar:sonar"
                        
                    }
                    timeout(time: 10, unit: 'MINUTES') {
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