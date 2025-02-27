import { useRoute, useRouter } from 'vue-router'

export default function useNavigate() {
  const route = useRoute()
  const router = useRouter()

  const navigateTo = (path) => {
    if (route.path !== path) {
      router.push(path)
    }
  }

  return { navigateTo }
}
