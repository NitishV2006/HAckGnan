import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Video, MessageCircle, User, MapPin, Star } from "lucide-react";

const upcomingBookings = [
  {
    id: "1",
    type: "consultation",
    title: "Stress Management Session",
    expert: "Dr. Sarah Williams",
    expertAvatar: "SW",
    specialty: "Mental Health & Wellness",
    date: "Today",
    time: "6:00 PM - 7:00 PM",
    duration: "60 mins",
    mode: "video",
    status: "confirmed",
    price: 999,
    notes: "Discuss work-related stress and develop coping strategies",
    rescheduleAllowed: true
  },
  {
    id: "2",
    type: "workshop",
    title: "Ayurvedic Cooking Basics",
    expert: "Chef Rajesh Kumar",
    expertAvatar: "RK",
    specialty: "Ayurvedic Nutrition",
    date: "Tomorrow",
    time: "6:00 PM - 7:30 PM",
    duration: "90 mins",
    mode: "video",
    status: "confirmed",
    price: 499,
    notes: "Learn to prepare dosha-balancing meals",
    rescheduleAllowed: true
  },
  {
    id: "3",
    type: "consultation",
    title: "Personalized Yoga Plan",
    expert: "Dr. Priya Sharma",
    expertAvatar: "PS",
    specialty: "Yoga & Meditation",
    date: "Dec 15",
    time: "7:00 AM - 8:00 AM",
    duration: "60 mins",
    mode: "video",
    status: "pending",
    price: 799,
    notes: "Create customized yoga routine for beginners",
    rescheduleAllowed: true
  }
];

const pastBookings = [
  {
    id: "p1",
    type: "consultation",
    title: "Nutrition Assessment",
    expert: "Chef Rajesh Kumar",
    expertAvatar: "RK",
    specialty: "Ayurvedic Nutrition",
    date: "Dec 5, 2024",
    time: "10:00 AM - 11:00 AM",
    duration: "60 mins",
    mode: "video",
    status: "completed",
    price: 599,
    rating: 5,
    review: "Excellent session! Got personalized meal plan and great insights.",
    canReview: false,
    canRebook: true
  },
  {
    id: "p2",
    type: "workshop",
    title: "Morning Yoga Flow",
    expert: "Dr. Priya Sharma",
    expertAvatar: "PS",
    specialty: "Yoga & Meditation",
    date: "Dec 1, 2024",
    time: "7:00 AM - 7:45 AM",
    duration: "45 mins",
    mode: "video",
    status: "completed",
    price: 299,
    rating: null,
    review: null,
    canReview: true,
    canRebook: true
  }
];

const getModeIcon = (mode: string) => {
  switch (mode) {
    case 'video': return <Video className="h-4 w-4" />;
    case 'chat': return <MessageCircle className="h-4 w-4" />;
    case 'inPerson': return <MapPin className="h-4 w-4" />;
    default: return <User className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed': return 'text-green-600 bg-green-50';
    case 'pending': return 'text-yellow-600 bg-yellow-50';
    case 'completed': return 'text-blue-600 bg-blue-50';
    case 'cancelled': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'consultation': return '👩‍⚕️';
    case 'workshop': return '🎓';
    default: return '📅';
  }
};

export const BookingsTab = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 premium-tabs">
          <TabsTrigger value="upcoming" className="premium-tab-trigger">
            Upcoming ({upcomingBookings.length})
          </TabsTrigger>
          <TabsTrigger value="history" className="premium-tab-trigger">
            History ({pastBookings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4 mt-6">
          {upcomingBookings.length === 0 ? (
            <Card className="premium-card">
              <CardContent className="text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="font-semibold text-lg mb-2">No upcoming bookings</h3>
                <p className="text-muted-foreground mb-4">Book a session or workshop to get started</p>
                <Button className="premium-button-primary">Browse Experts</Button>
              </CardContent>
            </Card>
          ) : (
            upcomingBookings.map((booking) => (
              <Card key={booking.id} className="premium-card">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Type Icon */}
                    <div className="w-12 h-12 bg-gradient-subtle rounded-xl flex items-center justify-center text-2xl">
                      {getTypeIcon(booking.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg text-foreground">{booking.title}</h3>
                          <p className="text-primary font-medium">with {booking.expert}</p>
                          <p className="text-sm text-muted-foreground">{booking.specialty}</p>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant="secondary" 
                            className={`${getStatusColor(booking.status)} premium-badge capitalize`}
                          >
                            {booking.status}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3 italic">"{booking.notes}"</p>

                      {/* Session Details */}
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          {getModeIcon(booking.mode)}
                          <span className="capitalize">{booking.mode} Call</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span className="font-semibold text-primary">₹{booking.price}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        {booking.status === 'confirmed' && booking.date === 'Today' && (
                          <Button className="premium-button-primary">
                            <Video className="h-4 w-4 mr-2" />
                            Join Session
                          </Button>
                        )}
                        {booking.rescheduleAllowed && (
                          <Button variant="outline" size="sm" className="premium-button">
                            Reschedule
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="premium-button text-red-600 hover:text-red-700">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4 mt-6">
          {pastBookings.length === 0 ? (
            <Card className="premium-card">
              <CardContent className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="font-semibold text-lg mb-2">No booking history</h3>
                <p className="text-muted-foreground mb-4">Your completed sessions will appear here</p>
              </CardContent>
            </Card>
          ) : (
            pastBookings.map((booking) => (
              <Card key={booking.id} className="premium-card">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Type Icon */}
                    <div className="w-12 h-12 bg-gradient-subtle rounded-xl flex items-center justify-center text-2xl">
                      {getTypeIcon(booking.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg text-foreground">{booking.title}</h3>
                          <p className="text-primary font-medium">with {booking.expert}</p>
                          <p className="text-sm text-muted-foreground">{booking.specialty}</p>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant="secondary" 
                            className={`${getStatusColor(booking.status)} premium-badge capitalize mb-2`}
                          >
                            {booking.status}
                          </Badge>
                          {booking.rating && (
                            <div className="flex items-center gap-1 text-sm">
                              <Star className="h-4 w-4 fill-accent text-accent" />
                              <span className="font-medium">{booking.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Session Details */}
                      <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{booking.time}</span>
                        </div>
                      </div>

                      {/* Review */}
                      {booking.review && (
                        <p className="text-sm text-muted-foreground mb-3 italic">"{booking.review}"</p>
                      )}

                      {/* Actions */}
                      <div className="flex gap-3">
                        {booking.canReview && (
                          <Button size="sm" className="premium-button-primary">
                            <Star className="h-4 w-4 mr-2" />
                            Rate & Review
                          </Button>
                        )}
                        {booking.canRebook && (
                          <Button variant="outline" size="sm" className="premium-button">
                            Book Again
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="premium-button">
                          Download Receipt
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};