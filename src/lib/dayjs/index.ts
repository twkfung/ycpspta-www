import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import isLeapYear from "dayjs/plugin/isLeapYear"
import isoWeek from "dayjs/plugin/isoWeek"

dayjs.extend(relativeTime)
dayjs.extend(isLeapYear)
dayjs.extend(isoWeek)

export default dayjs
