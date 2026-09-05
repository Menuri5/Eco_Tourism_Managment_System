/**
 * CampaignDetailPage - Details for a campaign, redesigned to match mockup.
 * Focuses on project milestones and project lead contact details instead of internal donations.
 */
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCampaigns } from '../../context/GlobalDataContext';
import { 
  HiOutlineMapPin, 
  HiOutlinePhoto, 
  HiOutlinePhone, 
  HiOutlineEnvelope,
  HiShieldCheck 
} from 'react-icons/hi2';

export default function CampaignDetailPage() {
  const { id } = useParams();
  const { campaigns } = useCampaigns();
  const campaign = campaigns.find(c => c.id === parseInt(id));

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

  // Fallbacks if data is missing for older campaigns
  const location = campaign.location || 'Sri Lanka';
  const shortDescription = campaign.shortDescription || campaign.description.substring(0, 150) + '...';
  const projectLead = campaign.projectLead || {
    name: 'EcoLanka Coordinator',
    role: 'Project Manager',
    bio: 'Dedicated conservationist coordinating efforts across Sri Lanka.',
    avatar: 'https://picsum.photos/seed/default-lead/150/150',
    email: 'contact@ecolanka.lk',
    phone: '+94 11 234 5678'
  };
  const milestones = campaign.milestones || [
    { label: 'Funds Raised ($)', current: campaign.raised, target: campaign.goal }
  ];
  const onTheGroundImages = campaign.onTheGroundImages || (
    campaign.images && campaign.images.length > 0
      ? campaign.images
      : [
          'https://picsum.photos/seed/def1/400/300',
          'https://picsum.photos/seed/def2/400/300',
          'https://picsum.photos/seed/def3/800/400'
        ]
  );

  return (
    <div className="pb-12 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* ─── Hero / Image Gallery ─── */}
      {(() => {
        const galleryImages = (campaign.images && campaign.images.length > 0)
          ? [campaign.image, ...campaign.images.filter(img => img !== campaign.image)]
          : [campaign.image];

        return galleryImages.length >= 3 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 h-[450px] rounded-2xl overflow-hidden mt-6 mb-10 shadow-lg relative">
            <div className="md:col-span-2 relative h-full">
              <img src={galleryImages[0]} alt={campaign.title} className="w-full h-full object-cover" />
            </div>
            <div className="hidden md:grid grid-rows-2 gap-2 h-full">
              <div className="relative h-full">
                <img src={galleryImages[1]} alt={campaign.title} className="w-full h-full object-cover" />
              </div>
              <div className="relative h-full">
                <img src={galleryImages[2]} alt={campaign.title} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 pointer-events-auto">
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
        ) : (
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

      {/* ─── Main Content ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column (Content) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-10">
          
          {/* About Section */}
          <section>
            <h2 className="text-2xl font-bold text-green-900 mb-5">About the Project</h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              {campaign.description.split('\n').map((paragraph, idx) => (
                paragraph ? <p key={idx}>{paragraph}</p> : null
              ))}
            </div>
          </section>

          {/* On the Ground Images */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center">
              <HiOutlinePhoto className="mr-2 h-6 w-6 text-green-800" />
              On the Ground
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {onTheGroundImages[0] && (
                <img 
                  src={onTheGroundImages[0]} 
                  alt="On the ground 1" 
                  className="w-full h-48 md:h-64 object-cover rounded-xl shadow-sm"
                />
              )}
              {onTheGroundImages[1] && (
                <img 
                  src={onTheGroundImages[1]} 
                  alt="On the ground 2" 
                  className="w-full h-48 md:h-64 object-cover rounded-xl shadow-sm"
                />
              )}
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

        {/* Right Column (Sidebar) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          
          {/* Project Milestones Card */}
          <div className="bg-[#f7f5f0] p-7 rounded-2xl border border-gray-100">
            <h3 className="text-xl font-bold text-green-900 mb-6">Project Milestones</h3>
            
            <div className="space-y-6">
              {milestones.map((milestone, idx) => {
                const percentage = Math.min(100, (milestone.current / milestone.target) * 100);
                return (
                  <div key={idx}>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-medium text-gray-600 w-1/2">
                        {milestone.label}
                      </span>
                      <span className="text-lg font-bold text-green-900 text-right">
                        {milestone.current.toLocaleString()} / {milestone.target.toLocaleString()}
                      </span>
                    </div>
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

          {/* Project Lead Card */}
          <div className="bg-[#f7f5f0] p-7 rounded-2xl border border-gray-100 text-center">
            <h3 className="text-xl font-bold text-green-900 mb-6 text-left">Project Lead</h3>
            
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
              <a 
                href={`mailto:${projectLead.email}`}
                className="flex items-center justify-center gap-2 w-full bg-[#0a2e0a] hover:bg-green-900 text-white font-medium py-3 rounded-lg transition-colors text-sm"
              >
                <HiOutlineEnvelope className="h-5 w-5" />
                {projectLead.email}
              </a>
              
              <a 
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
