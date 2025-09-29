# CI/CD 자동 배포 설정 가이드

이 가이드는 organization repo의 main 브랜치 변경사항을 fork한 저장소에 자동으로 동기화하고 Vercel에 배포하는 CI/CD 파이프라인 설정 방법을 설명합니다.

## 📋 필요한 설정

### 1. GitHub Secrets 설정

fork한 저장소의 Settings > Secrets and variables > Actions에서 다음 secrets를 추가해야 합니다:

#### 필수 Secrets:

- `UPSTREAM_OWNER`: 원본 organization의 GitHub 사용자명 또는 조직명
- `UPSTREAM_REPO`: 원본 저장소 이름
- `VERCEL_TOKEN`: Vercel API 토큰
- `VERCEL_ORG_ID`: Vercel 조직 ID
- `VERCEL_PROJECT_ID`: Vercel 프로젝트 ID

#### Secrets 설정 방법:

1. **UPSTREAM_OWNER & UPSTREAM_REPO**

   ```text
   UPSTREAM_OWNER: your-organization-name
   UPSTREAM_REPO: HDI-LAB
   ```

2. **VERCEL_TOKEN**
   - Vercel 대시보드 → Settings → Tokens
   - "Create Token" 클릭
   - 토큰 이름 입력 후 생성
   - 생성된 토큰을 복사하여 GitHub Secrets에 추가

3. **VERCEL_ORG_ID & VERCEL_PROJECT_ID**
   - Vercel 대시보드 → 프로젝트 설정 → General
   - Project ID와 Team ID 확인
   - 또는 Vercel CLI로 확인:

     ```bash
     npx vercel link
     cat .vercel/project.json
     ```

### 2. 워크플로우 파일 설명

#### `sync-and-deploy.yml`

- **트리거**: 10분마다 스케줄 실행 또는 수동 실행
- **기능**:
  - upstream 저장소의 main 브랜치 변경사항 확인
  - 변경사항이 있으면 자동으로 동기화
  - 빌드 및 Vercel 배포 실행

#### `vercel-deploy.yml`

- **트리거**: main 브랜치에 push할 때마다
- **기능**: Vercel에 직접 배포

### 3. 동작 원리

1. **스케줄 트리거**: 10분마다 upstream 저장소의 main 브랜치를 체크
2. **변경사항 감지**: upstream과 로컬의 커밋 해시를 비교
3. **자동 동기화**: 변경사항이 있으면 upstream의 변경사항을 merge
4. **자동 배포**: 동기화 후 자동으로 Vercel에 배포

### 4. 수동 실행

GitHub Actions 탭에서 "Sync from Organization Repo and Deploy to Vercel" 워크플로우를 수동으로 실행할 수 있습니다:

1. Actions 탭으로 이동
2. "Sync from Organization Repo and Deploy to Vercel" 워크플로우 선택
3. "Run workflow" 버튼 클릭
4. 필요시 "Force sync" 옵션 체크

### 5. 로그 확인

배포 상태와 로그는 다음 위치에서 확인할 수 있습니다:

- GitHub Actions 탭
- Vercel 대시보드

### 6. 문제 해결

#### 자주 발생하는 문제:

1. **Secrets 설정 오류**
   - 모든 필수 secrets가 올바르게 설정되었는지 확인
   - Vercel 토큰의 권한이 충분한지 확인

2. **빌드 실패**
   - package.json의 빌드 스크립트 확인
   - 의존성 설치 문제 확인

3. **배포 실패**
   - Vercel 프로젝트 ID와 조직 ID 확인
   - Vercel 토큰 권한 확인

### 7. 커스터마이징

#### 스케줄 간격 조정:

```yaml
schedule:
  - cron: '*/5 * * * *' # 5분마다
  - cron: '0 */1 * * *' # 1시간마다
  - cron: '0 9 * * *' # 매일 오전 9시
```

#### 추가 빌드 단계:

```yaml
- name: Run tests
  run: pnpm test

- name: Run linting
  run: pnpm lint
```

## 🚀 시작하기

1. 위의 모든 secrets를 GitHub 저장소에 설정
2. 워크플로우 파일들이 `.github/workflows/` 디렉토리에 있는지 확인
3. 첫 번째 수동 실행으로 테스트
4. 자동 스케줄 실행 대기 (최대 10분)

이제 organization repo의 main 브랜치에 변경사항이 있을 때마다 자동으로 fork한 저장소가 업데이트되고 Vercel에 배포됩니다! 🎉
