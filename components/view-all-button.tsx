import Link from "next/link"

interface ViewAllButtonProps {
  href: string
  className?: string
}

export function ViewAllButton({ href, className = "" }: ViewAllButtonProps) {
  return (
    <Link
      href={href}
      className={`hl-btn btn-base small-btn fw-normal text-uppercase flex-shrink-0 d-sm-inline-block d-none ${className}`}
    >
      <span>View All</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 18 14" fill="none">
        <path
          opacity="0.8"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0304 0.562497V0H10.9054V0.562497C10.9054 2.69834 12.0892 4.75254 13.871 5.96946H0V7.09445H13.871C12.0893 8.31136 10.9054 10.3656 10.9054 12.5014V13.0639H12.0304V12.5014C12.0304 9.73629 14.4843 7.10404 17.4214 7.09448C17.4268 7.09449 17.4321 7.0945 17.4375 7.0945H18V7.09445V5.96951V5.96946H17.9995H17.4375H17.4159C14.4812 5.95662 12.0304 3.32594 12.0304 0.562497Z"
          fill="currentColor"
        ></path>
      </svg>
    </Link>
  )
}
