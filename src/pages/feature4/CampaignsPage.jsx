/**
 * CampaignDetailPage
 * -------------------
 * This is the "detail" page for a single campaign (conservation/community
 * project). It shows a hero image gallery, the project description,
 * "on the ground" photos, progress milestones (progress bars), and a
 * contact card for the project lead.
 *
 * Redesigned to match the mockup — shows "project milestones" and
 * "project lead contact details" instead of internal donation info.
 */

// React import — needed to write JSX (HTML-like syntax) in this file
import React from 'react';

// useParams reads the dynamic part of the URL (e.g. /campaigns/5 -> id = "5")
// Link works like an <a> tag, but navigates without reloading the whole page
import { useParams, Link } from 'react-router-dom';

// Pulls the full list of campaigns from global context (acts like a
// shared in-memory "database" for the whole app)
import { useCampaigns } from '../../context/GlobalDataContext';

// Icons used in this page (location pin, photo icon, phone, email, shield)
import {
  HiOutlineMapPin,
  HiOutlinePhoto,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiShieldCheck
} from 'react-icons/hi2';

export default function CampaignDetailPage() {
  // ─────────────────────────────────────────────
  // 1) DATA GATHERING
  // ─────────────────────────────────────────────

  // Get the id from the URL (e.g. /campaigns/3 -> id = "3", as a string)
  const { id } = useParams();

  // Get the full campaigns array from context (all campaigns in the app)
  const { campaigns } = useCampaigns();

  // Find the campaign whose id matches the URL id.
  // parseInt() is needed because the URL id is text ("3"), but
  // campaign.id is stored as a number (3) — so we convert to compare.
  const campaign = campaigns.find(c => c.id === parseInt(id));

  // ─────────────────────────────────────────────
  // 2) SAFETY CHECK — campaign not found
  // ─────────────────────────────────────────────
  // If the URL has a wrong/old id, or the campaign was deleted,
  // "campaign" will be undefined. Instead of crashing, we show a
  // friendly "not found" message with a link back to the campaigns list.
  if (!campaign) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Campaign not found</h2>
        <Link to="/campaigns" className="text-eco-ocean mt-4 inline-block hover:underline">
          Return to Campaigns
        </Link>
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // 3) FALLBACK DATA
  // ─────────────────────────────────────────────
  // "Fallback" means: if a certain field is missing from this campaign
  // (e.g. older campaigns that don't have the new fields), we use a
  // sensible default instead of showing "undefined" or crashing the page.

  // If location is missing, default to "Sri Lanka"
  const location = campaign.location || 'Sri Lanka';

  // If there's no short description, build one from the first 150
  // characters of the full description, followed by "..."
  const shortDescription = campaign.shortDescription || campaign.description.substring(0, 150) + '...';

  // If there's no project lead info, use a generic placeholder person
  const projectLead = campaign.projectLead || {
    name: 'EcoLanka Coordinator',
    role: 'Project Manager',
    bio: 'Dedicated conservationist coordinating efforts across Sri Lanka.',
    avatar: 'https://picsum.photos/seed/default-lead/150/150',
    email: 'contact@ecolanka.lk',
    phone: '+94 11 234 5678'
  };

  // If there are no milestones defined, show a single default milestone
  // based on funds raised vs. the goal
  const milestones = campaign.milestones || [
    { label: 'Funds Raised ($)', current: campaign.raised, target: campaign.goal }
  ];

  // "On the ground" photos:
  //   1. Use campaign.onTheGroundImages if it exists
  //   2. Otherwise, fall back to campaign.images if available
  //   3. Otherwise, use 3 generic placeholder photos
  const onTheGroundImages = campaign.onTheGroundImages || (
    campaign.images && campaign.images.length > 0
      ? campaign.images
      : [
          'https://picsum.photos/seed/def1/400/300',
          'https://picsum.photos/seed/def2/400/300',
          'https://picsum.photos/seed/def3/800/400'
        ]
  );

  // ─────────────────────────────────────────────
  // 4) MAIN JSX — WHAT ACTUALLY RENDERS ON SCREEN
  // ─────────────────────────────────────────────
  return (
    <div className="pb-12 max-w-7xl mx-auto px-4 sm:px-6">

      {/* ─── Hero / Image Gallery Section ───
          This is the big image section at the top of the page.
          We use an IIFE (Immediately Invoked Function Expression) —
          the (() => { ... })() pattern — because we need to run some
          if/else logic before returning JSX, and you can't put a plain
          "if" statement directly inside JSX. */}
      {(() => {
        // Put the main campaign.image first, then add any other images
        // from campaign.images, but filter out a duplicate of the main image
        const galleryImages = (campaign.images && campaign.images.length > 0)
          ? [campaign.image, ...campaign.images.filter(img => img !== campaign.image)]
          : [campaign.image];

        // If we have 3 or more images, show a "big + 2 small" grid layout.
        // Otherwise, just show a single full-width image.
        return galleryImages.length >= 3 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 h-[450px] rounded-2xl overflow-hidden mt-6 mb-10 shadow-lg relative">

            {/* Big image on the left (spans 2 of the 3 grid columns) */}
            <div className="md:col-span-2 relative h-full">
              <img src={galleryImages[0]} alt={campaign.title} className="w-full h-full object-cover" />
            </div>

            {/* 2 smaller images stacked on the right — hidden on mobile */}
            <div className="hidden md:grid grid-rows-2 gap-2 h-full">
              <div className="relative h-full">
                <img src={galleryImages[1]} alt={campaign.title} className="w-full h-full object-cover" />
              </div>
              <div className="relative h-full">
                <img src={galleryImages[2]} alt={campaign.title} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Dark gradient overlay so the white text below stays readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"></div>

            {/* Text overlay: category badge, location, title, short description */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 pointer-events-auto">
              <div className="flex items-center gap-3 mb-4">
                {/* Category badge (e.g. "Wildlife") */}
                <span className="bg-green-600 text-white px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider">
                  {campaign.category}
                </span>
                {/* Location text, with a map pin icon */}
                <span className="flex items-center text-white/90 text-sm font-medium">
                  <HiOutlineMapPin className="mr-1 h-4 w-4" />
                  {location}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {campaign.title}
              </h1>
              <p className="text-white/80 text-base md:text-lg max-w-3xl leading-relaxed">
                {shortDescription}
              </p>
            </div>
          </div>
        ) : (
          // Fewer than 3 images: show a single full-width hero image
          // with the same text overlay on top
          <div className="relative w-full h-[450px] rounded-2xl overflow-hidden mt-6 mb-10 shadow-lg">
            <img
              src={galleryImages[0]}
              alt={campaign.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-green-600 text-white px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider">
                  {campaign.category}
                </span>
                <span className="flex items-center text-white/90 text-sm font-medium">
                  <HiOutlineMapPin className="mr-1 h-4 w-4" />
                  {location}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {campaign.title}
              </h1>
              <p className="text-white/80 text-base md:text-lg max-w-3xl leading-relaxed">
                {shortDescription}
              </p>
            </div>
          </div>
        );
      })()}

      {/* ─── Main Content Section ───
          Two-column layout below the hero: left = main content,
          right = sidebar cards. "grid-cols-12" splits the row into
          12 equal parts, and each column below claims a share of them. */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* ─── Left Column (Main Content) ─── */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-10">

          {/* About Section — the full campaign description */}
          <section>
            <h2 className="text-2xl font-bold text-green-900 mb-5">About the Project</h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              {/* Split the description on newline characters and render each
                  chunk as its own <p> paragraph. Skip empty lines. */}
              {campaign.description.split('\n').map((paragraph, idx) => (
                paragraph ? <p key={idx}>{paragraph}</p> : null
              ))}
            </div>
          </section>

          {/* "On the Ground" Photos Section */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center">
              <HiOutlinePhoto className="mr-2 h-6 w-6 text-green-800" />
              On the Ground
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Photo 1 — only render if it actually exists (safety check) */}
              {onTheGroundImages[0] && (
                <img
                  src={onTheGroundImages[0]}
                  alt="On the ground 1"
                  className="w-full h-48 md:h-64 object-cover rounded-xl shadow-sm"
                />
              )}
              {/* Photo 2 */}
              {onTheGroundImages[1] && (
                <img
                  src={onTheGroundImages[1]}
                  alt="On the ground 2"
                  className="w-full h-48 md:h-64 object-cover rounded-xl shadow-sm"
                />
              )}
              {/* Photo 3 — spans both grid columns, so it appears as a
                  full-width row below the first two photos */}
              {onTheGroundImages[2] && (
                <img
                  src={onTheGroundImages[2]}
                  alt="On the ground 3"
                  className="w-full h-64 md:h-80 object-cover rounded-xl shadow-sm col-span-2"
                />
              )}
            </div>
          </section>
        </div>

        {/* ─── Right Column (Sidebar) ─── */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">

          {/* Project Milestones Card — progress bars */}
          <div className="bg-[#f7f5f0] p-7 rounded-2xl border border-gray-100">
            <h3 className="text-xl font-bold text-green-900 mb-6">Project Milestones</h3>

            <div className="space-y-6">
              {/* Loop through each milestone and render a progress bar
                  (e.g. "Funds Raised: 5,000 / 10,000") */}
              {milestones.map((milestone, idx) => {
                // Calculate the percentage complete.
                // Math.min(100, ...) caps the bar at 100% even if
                // current somehow exceeds target.
                const percentage = Math.min(100, (milestone.current / milestone.target) * 100);
                return (
                  <div key={idx}>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-medium text-gray-600 w-1/2">
                        {milestone.label}
                      </span>
                      {/* toLocaleString() adds thousands separators,
                          e.g. 5000 -> "5,000", for readability */}
                      <span className="text-lg font-bold text-green-900 text-right">
                        {milestone.current.toLocaleString()} / {milestone.target.toLocaleString()}
                      </span>
                    </div>
                    {/* The actual progress bar: gray track, green fill
                        whose width is set inline based on percentage */}
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-green-800 h-1.5 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Static extra info block — "Endemic Species Monitored".
                This is hardcoded (not driven by data), purely for design. */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex items-start gap-3">
              <div className="bg-teal-100 p-2 rounded-full flex-shrink-0 mt-1">
                <HiShieldCheck className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800">Endemic Species Monitored</h4>
                <p className="text-xs text-gray-500 mt-1">Tracking 12 key species indicative of habitat recovery.</p>
              </div>
            </div>
          </div>

          {/* Project Lead Card — contact details */}
          <div className="bg-[#f7f5f0] p-7 rounded-2xl border border-gray-100 text-center">
            <h3 className="text-xl font-bold text-green-900 mb-6 text-left">Project Lead</h3>

            {/* Round profile photo */}
            <img
              src={projectLead.avatar}
              alt={projectLead.name}
              className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-white shadow-sm"
            />

            <h4 className="text-lg font-bold text-gray-900">{projectLead.name}</h4>
            <p className="text-xs font-bold text-green-700 uppercase tracking-wide mt-1 mb-3">
              {projectLead.role}
            </p>

            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              {projectLead.bio}
            </p>

            <div className="flex flex-col gap-3">
              {/* Email button — clicking opens the user's mail app,
                  thanks to the "mailto:" link */}
              
                href={`mailto:${projectLead.email}`}
                className="flex items-center justify-center gap-2 w-full bg-[#0a2e0a] hover:bg-green-900 text-white font-medium py-3 rounded-lg transition-colors text-sm"
              >
                <HiOutlineEnvelope className="h-5 w-5" />
                {projectLead.email}
              </a>

              {/* Phone button — clicking opens the phone/dialer app,
                  thanks to the "tel:" link. replace(/\s/g, '') strips
                  out all spaces from the phone number
                  (e.g. "+94 11 234 5678" -> "+94112345678") */}
              
                href={`tel:${projectLead.phone.replace(/\s/g, '')}`}
                className="flex items-center justify-center gap-2 w-full border border-[#0a2e0a] text-[#0a2e0a] hover:bg-green-50 font-medium py-3 rounded-lg transition-colors text-sm"
              >
                <HiOutlinePhone className="h-5 w-5" />
                {projectLead.phone}
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}