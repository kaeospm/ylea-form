import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import type { ApplicationRow } from '../../types'
import '../../admin.css'

export default function AdminDashboard() {
  const [applications, setApplications] = useState<ApplicationRow[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [municipalityFilter, setMunicipalityFilter] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/admin', { replace: true })
        return
      }
      fetchApplications()
    })
  }, [navigate])

  const fetchApplications = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('ylea_applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Fetch error:', error)
    } else {
      setApplications(data || [])
    }
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin', { replace: true })
  }

  const municipalities = [...new Set(applications.map(a => a.municipality).filter(Boolean))].sort()

  const filtered = applications.filter(a => {
    const matchesSearch = !search ||
      a.full_name.toLowerCase().includes(search.toLowerCase()) ||
      a.reference_id.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.school_name.toLowerCase().includes(search.toLowerCase())
    const matchesMunicipality = !municipalityFilter || a.municipality === municipalityFilter
    return matchesSearch && matchesMunicipality
  })

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="admin-header-left">
          <p className="label-top">41ST YLEA</p>
          <h1>Applications Dashboard</h1>
        </div>
        <div className="admin-header-right">
          <span className="admin-count">{applications.length} total</span>
          <button className="btn-secondary" onClick={handleLogout}>Sign Out</button>
        </div>
      </header>

      <div className="admin-toolbar">
        <input
          className="field-input admin-search"
          type="text"
          placeholder="Search by name, reference ID, email, or school..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="field-input admin-filter"
          value={municipalityFilter}
          onChange={e => setMunicipalityFilter(e.target.value)}
        >
          <option value="">All Municipalities</option>
          {municipalities.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <button className="btn-secondary" onClick={fetchApplications}>Refresh</button>
      </div>

      {loading ? (
        <div className="admin-loading">Loading applications...</div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty">
          {applications.length === 0 ? 'No applications yet.' : 'No applications match your search.'}
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Reference ID</th>
                <th>Full Name</th>
                <th>Municipality</th>
                <th>School</th>
                <th>Level</th>
                <th>Submitted</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app, i) => (
                <tr key={app.id}>
                  <td>{i + 1}</td>
                  <td><code className="ref-code">{app.reference_id}</code></td>
                  <td className="name-cell">{app.full_name}</td>
                  <td>{app.municipality}</td>
                  <td>{app.school_name}</td>
                  <td>{app.school_level}</td>
                  <td>{new Date(app.created_at).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                  <td>
                    <button
                      className="btn-view"
                      onClick={() => navigate(`/admin/application/${app.id}`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="admin-footer">
        Showing {filtered.length} of {applications.length} applications
      </div>
    </div>
  )
}
