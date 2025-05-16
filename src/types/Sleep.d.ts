enum InfoCode {
  0,
  1,
  2,
  3,
}

export interface Sleep {
  id: number,
  duration: number,
  efficiency: number,
  info_code: InfoCode,
  date_of_sleep: string,
  end_time: string,
  created_at: Date,
  updated_at: Date,
  deleted_at: Date
}
