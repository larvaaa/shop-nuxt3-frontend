pipeline {
    agent any
    tools {
        // 프론트엔드 전용 도구인 Node.js를 불러옵니다. (플러그인 설치 시 만든 이름)
        nodejs 'Node20' 
    }

    stages {
        stage('1. Checkout') {
            steps {
                // 프론트엔드 깃허브 저장소 주소로 변경해주세요.
                git branch: 'main', credentialsId: 'github-token', url: 'https://github.com/larvaaa/shop-nuxt3-frontend.git'
            }
        }

        stage('2. Build (Nuxt3)') {
            steps {
                sh '''                   
                    # pnpm-lock.yaml을 기반으로 빠르고 정확하게 패키지를 설치합니다.
                    pnpm install
                    
                    # 운영 서버용 빌드를 실행합니다! (package.json 확인 후 알맞게 변경하세요)
                    pnpm run build:dev
                '''
            }
        }

        stage('3. Deploy (PM2)') {
            steps {
                script { env.JENKINS_NODE_COOKIE = 'dontKillMe' }
                echo "PM2를 이용한 프론트엔드 무중단 배포 시작..."
                
                sh '''
                    # PM2 글로벌 설치 (이미 있다면 생략됨)
                    npm install -g pm2 || true
                    
                    # shop-frontend라는 프로세스가 돌고 있는지 확인
                    if pm2 describe shop-frontend > /dev/null 2>&1; then
                        echo "기존 프로세스 무중단 재시작 (Reload)"
                        pm2 reload shop-frontend
                    else
                        echo "새 프로세스 실행 (Start)"
                        # 포트 3000번으로 pm2 백그라운드 실행
                        PORT=3000 pm2 start .output/server/index.mjs --name "shop-frontend"
                    fi
                    
                    # 서버 재부팅을 대비해 현재 PM2 상태 저장
                    pm2 save
                '''
            }
        }
    }
}