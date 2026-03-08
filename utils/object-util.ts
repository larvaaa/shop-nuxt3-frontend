export function updateCommonProperties<T extends object, S extends object>(
  target: T,
  source: S,
): void {
  Object.keys(target).forEach((key) => {
    // key가 source에도 존재하는지 확인
    if (key in source) {
      // 값 복사 (타입 안전성을 위해 as any 허용)
      ;(target as any)[key] = (source as any)[key]
    }
  })
}
