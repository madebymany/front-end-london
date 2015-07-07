module EventHelper
  def event_upcoming?(events)
    latest_event_date_end(events) > Time.now
  end

  def latest_event(events)
    events.first
  end

  def latest_event_date(events)
    event_date(latest_event(events))
  end

  def latest_event_date_end(events)
    event_date_end(latest_event(events))
  end

  def event_date(event)
    Chronic.parse(event.date)
  end

  def event_date_end(event)
    (event_date(event) + event.duration*60*60)
  end

  def previous_events(events)
    events.select { |e| event_date_end(e) < Time.now }
  end

  def tickets_released_date(events)
    Chronic.parse(latest_event(events).tickets_released)
  end

  def event_writeups(event)
    event.writeups.select { |w| w.author.present? && w.writeup_url.present? }
  end
end
