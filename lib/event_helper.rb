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

  def speaker_image(img)
    if img.present?
      "speakers/#{img}"
    else
      "data:image/gif;base64,R0lGODlhjACMAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzIgNzkuMTU5Mjg0LCAyMDE2LzA0LzE5LTEzOjEzOjQwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE4QjRDOEY5NzM1RTExRTZCMjc2RTM4RTZCNjU5REY1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE4QjRDOEZBNzM1RTExRTZCMjc2RTM4RTZCNjU5REY1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MThCNEM4Rjc3MzVFMTFFNkIyNzZFMzhFNkI2NTlERjUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MThCNEM4Rjg3MzVFMTFFNkIyNzZFMzhFNkI2NTlERjUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQBAAAAACwAAAAAjACMAAACrISPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCofEovGITCqXzKbzCY1Kp9Sq9YrNarfcrvcLDovH5LL5jE6r1+y2+w2Py+f0uv2Oz+v3/L7/DxgoOEhYaHiImKi4yNjo+AgZKTlJWWl5iZmpucnZ6fkJGio6SlpqeoqaqrrK2ur6ChsrO0tba3uLm6u7y9vr+wscLDxMXGx8jJxcVgAAOw=="
    end
  end
end
