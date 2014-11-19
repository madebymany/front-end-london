module EventHelper
  def events
    data.events.events
  end

  def event_upcoming?
    latest_event_date_end > Time.now
  end

  def latest_event
    events.first
  end

  def latest_event_date
    event_date(latest_event)
  end

  def latest_event_date_end
    event_date_end(latest_event)
  end

  def event_date(event)
    Chronic.parse(event.date)
  end

  def event_date_end(event)
    (event_date(event) + event.duration*60*60)
  end

  def previous_events
    events.select { |e| event_date_end(e) < Time.now }
  end

  def tickets_released_date
    Chronic.parse(latest_event.tickets_released)
  end

  def event_writeups(event)
    event.writeups.select { |w| w.author.present? && w.writeup_url.present? }
  end
end
