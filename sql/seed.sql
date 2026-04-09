-- Sample Seed Data for Professional Association Website
-- This file contains sample data to populate the database for testing and demo purposes

-- =====================================================
-- EVENTS SAMPLE DATA
-- =====================================================

INSERT INTO events (title, description, date, time, location, image_url, category, status, price, max_attendees) VALUES

-- Upcoming Events
('Annual Business Summit 2026', 
 'Join industry leaders for our flagship annual event featuring keynote speakers, panel discussions, and networking opportunities. This comprehensive summit brings together professionals from across Europe to discuss the latest trends, challenges, and opportunities in our industry.

The event will feature:
• Keynote presentations from industry thought leaders
• Interactive panel discussions
• Networking sessions and workshops
• Exhibition hall showcasing innovative solutions
• Gala dinner and awards ceremony

Don''t miss this opportunity to connect with peers, gain valuable insights, and advance your career.', 
 '2026-04-15', '09:00', 'Brussels Convention Center, Avenue des Arts 20, 1000 Brussels', 
 'https://images.unsplash.com/photo-1769798643237-8642a3fbe5bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', 
 'Conference', 'upcoming', 150.00, 500),

('Professional Development Workshop', 
 'Enhance your skills with expert-led training sessions covering the latest industry trends and best practices. This hands-on workshop is designed for professionals looking to advance their careers and stay competitive in today''s rapidly evolving business landscape.

Topics covered:
• Leadership and management skills
• Digital transformation strategies
• Effective communication techniques
• Project management best practices
• Career advancement strategies

Limited seats available. Register early to secure your spot.', 
 '2026-04-22', '14:00', 'Association Headquarters, 123 Professional Avenue, Brussels', 
 'https://images.unsplash.com/photo-1765438863717-49fca900f861?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', 
 'Workshop', 'upcoming', 75.00, 50),

('Spring Networking Mixer', 
 'Connect with fellow professionals in a relaxed setting. This informal evening includes refreshments, interactive activities, and plenty of opportunities to expand your network.

What to expect:
• Welcome reception with refreshments
• Speed networking sessions
• Industry roundtable discussions
• Live music and entertainment
• Prize draws and giveaways

This is a complimentary event for members and their guests. Non-members are welcome for a small fee.', 
 '2026-05-10', '18:00', 'The Grand Hotel Brussels, Rue du Grand Place 1, 1000 Brussels', 
 'https://images.unsplash.com/photo-1675716921224-e087a0cca69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', 
 'Networking', 'upcoming', 0.00, 100),

('Innovation Summit 2026', 
 'Explore cutting-edge innovations and technologies shaping the future of our industry. This two-day summit features demonstrations, case studies, and hands-on sessions with the latest tools and technologies.

Highlights:
• Product demonstrations from leading vendors
• Case study presentations
• Innovation showcase
• Startup pitch sessions
• Technology workshops
• Future trends panel

Perfect for tech enthusiasts and innovation leaders.', 
 '2026-06-05', '10:00', 'European Innovation Center, Rue de la Science 14, 1040 Brussels', 
 'https://images.unsplash.com/photo-1758691736067-b309ee3ef7b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', 
 'Conference', 'upcoming', 200.00, 300),

('Leadership Excellence Training', 
 'Intensive one-day training program designed to develop essential leadership skills. Led by renowned executive coaches and industry experts.

Training modules:
• Strategic thinking and decision making
• Building high-performance teams
• Change management and adaptability
• Emotional intelligence in leadership
• Coaching and mentoring skills

Includes course materials, lunch, and certificate of completion.', 
 '2026-06-20', '09:00', 'Association Headquarters, 123 Professional Avenue, Brussels', 
 'https://images.unsplash.com/photo-1765438863717-49fca900f861?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', 
 'Training', 'upcoming', 125.00, 40),

-- Past Events
('Winter Gala 2025', 
 'Our annual celebration brought together over 180 members for an elegant evening of recognition and celebration. The event featured:

• Awards ceremony honoring outstanding members
• Three-course gourmet dinner
• Live entertainment and dancing
• Silent auction for charity
• Year in review presentation

Thank you to all who attended and made this event memorable.', 
 '2025-12-15', '19:00', 'Royal Palace Brussels, Place des Palais 1, 1000 Brussels', 
 'https://images.unsplash.com/photo-1675716921224-e087a0cca69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', 
 'Social', 'past', 100.00, 200),

('Leadership Forum 2025', 
 'This highly successful forum featured distinguished speakers sharing insights on effective leadership in challenging times. Attendees engaged in meaningful discussions about:

• Adaptive leadership strategies
• Building resilient organizations
• Fostering innovation culture
• Leading through uncertainty
• Developing future leaders

Over 140 participants rated the event 4.8/5.', 
 '2025-10-20', '09:00', 'Brussels Business Center, Avenue Louise 250, 1050 Brussels', 
 'https://images.unsplash.com/photo-1758691736067-b309ee3ef7b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', 
 'Conference', 'past', 125.00, 150),

('Digital Transformation Workshop', 
 'A practical workshop that helped participants understand and implement digital transformation strategies in their organizations.

Key takeaways:
• Digital strategy frameworks
• Technology assessment tools
• Change management approaches
• ROI measurement techniques

Participants left with actionable plans for their organizations.', 
 '2025-09-18', '13:00', 'Association Headquarters, 123 Professional Avenue, Brussels', 
 'https://images.unsplash.com/photo-1765438863717-49fca900f861?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', 
 'Workshop', 'past', 85.00, 45);

-- =====================================================
-- COMMITTEE MEMBERS SAMPLE DATA
-- =====================================================

INSERT INTO committee_members (name, role, bio, image_url, "order") VALUES

('Dr. Sarah Johnson', 
 'President', 
 'Leading the association with over 20 years of industry experience. Sarah is passionate about fostering professional excellence and building strong communities. She holds a PhD in Business Administration and has published numerous articles on leadership and organizational development.',
 'https://images.unsplash.com/photo-1573497161161-c3e73707e25c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', 
 1),

('Michael Chen', 
 'Vice President', 
 'Passionate about innovation and member engagement, Michael brings fresh perspectives and energy to the association. With a background in technology and business strategy, he focuses on modernizing our operations and expanding our digital presence.',
 'https://images.unsplash.com/photo-1573497161161-c3e73707e25c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', 
 2),

('Emma Rodriguez', 
 'Treasurer', 
 'Ensuring financial sustainability and transparency, Emma manages the association''s finances with precision and integrity. A certified public accountant with 15 years of experience, she is committed to responsible financial stewardship and long-term planning.',
 'https://images.unsplash.com/photo-1573497161161-c3e73707e25c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', 
 3),

('David Okonkwo', 
 'Secretary', 
 'Committed to clear communication and member support, David ensures smooth operations and excellent service to all members. His attention to detail and organizational skills keep our association running efficiently.',
 'https://images.unsplash.com/photo-1573497161161-c3e73707e25c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', 
 4),

('Dr. Lisa Van Der Berg', 
 'Events Director', 
 'Orchestrating memorable experiences for our members, Lisa brings creativity and professionalism to every event. With a background in event management and hospitality, she ensures each gathering exceeds expectations.',
 'https://images.unsplash.com/photo-1573497161161-c3e73707e25c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', 
 5),

('James Anderson', 
 'Membership Director', 
 'Dedicated to growing our community and enhancing member value, James focuses on recruitment, retention, and member satisfaction. His welcoming approach makes every member feel valued and connected.',
 'https://images.unsplash.com/photo-1573497161161-c3e73707e25c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', 
 6);

-- =====================================================
-- SAMPLE CONTACT SUBMISSIONS (for testing)
-- =====================================================

INSERT INTO contact_submissions (name, email, subject, message) VALUES

('John Smith', 
 'mox@polytechnique.fr', 
 'Inquiry about Corporate Membership', 
 'Hello, I am interested in learning more about corporate membership options for our organization. Could you please send me detailed information about the benefits and pricing?'),

('Maria Garcia', 
 'mox@polytechnique.fr', 
 'Question about upcoming events', 
 'I would like to know if the Annual Business Summit will have virtual attendance options for international members. Thank you!'),

('Robert Williams', 
 'mox@polytechnique.fr', 
 'Partnership Opportunity', 
 'Our company is interested in exploring partnership opportunities with your association. We specialize in professional development training and think there could be synergies. Please contact me to discuss further.');

-- =====================================================
-- SAMPLE MEMBERSHIP APPLICATIONS (for testing)
-- =====================================================

INSERT INTO membership_applications (full_name, email, phone, address, city, postal_code, country, membership_type, payment_status) VALUES

('Alice Thompson', 
 'mox@polytechnique.fr', 
 '+32 2 123 4567', 
 'Rue de la Loi 100', 
 'Brussels', 
 '1040', 
 'Belgium', 
 'individual', 
 'completed'),

('Thomas Mueller', 
 'mox@polytechnique.fr', 
 '+32 2 234 5678', 
 'Avenue Louise 54', 
 'Brussels', 
 '1050', 
 'Belgium', 
 'student', 
 'pending'),

('Sophie Dubois', 
 'mox@polytechnique.fr', 
 '+32 2 345 6789', 
 'Boulevard Anspach 111', 
 'Brussels', 
 '1000', 
 'Belgium', 
 'individual', 
 'completed');

-- =====================================================
-- VERIFICATION QUERIES
-- Run these to verify data was inserted correctly
-- =====================================================

-- Count events
-- SELECT status, COUNT(*) FROM events GROUP BY status;

-- List upcoming events
-- SELECT title, date, price FROM events WHERE status = 'upcoming' ORDER BY date;

-- List committee members
-- SELECT name, role FROM committee_members ORDER BY "order";

-- Count contact submissions
-- SELECT COUNT(*) FROM contact_submissions;

-- Count membership applications by type
-- SELECT membership_type, COUNT(*) FROM membership_applications GROUP BY membership_type;
