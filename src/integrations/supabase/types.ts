export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          amount_paid: number
          booking_type: string
          created_at: string
          duration_minutes: number | null
          expert_id: string | null
          id: string
          points_used: number | null
          scheduled_time: string
          status: string | null
          updated_at: string
          user_id: string
          workshop_id: string | null
        }
        Insert: {
          amount_paid: number
          booking_type: string
          created_at?: string
          duration_minutes?: number | null
          expert_id?: string | null
          id?: string
          points_used?: number | null
          scheduled_time: string
          status?: string | null
          updated_at?: string
          user_id: string
          workshop_id?: string | null
        }
        Update: {
          amount_paid?: number
          booking_type?: string
          created_at?: string
          duration_minutes?: number | null
          expert_id?: string | null
          id?: string
          points_used?: number | null
          scheduled_time?: string
          status?: string | null
          updated_at?: string
          user_id?: string
          workshop_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_expert_id_fkey"
            columns: ["expert_id"]
            isOneToOne: false
            referencedRelation: "experts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_workshop_id_fkey"
            columns: ["workshop_id"]
            isOneToOne: false
            referencedRelation: "workshops"
            referencedColumns: ["id"]
          },
        ]
      }
      cart_items: {
        Row: {
          created_at: string
          id: string
          product_id: string | null
          quantity: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id?: string | null
          quantity?: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string | null
          quantity?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      community_groups: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          members_count: number | null
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          members_count?: number | null
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          members_count?: number | null
          name?: string
        }
        Relationships: []
      }
      community_posts: {
        Row: {
          badge: string | null
          comments_count: number | null
          content: string
          created_at: string
          group_name: string | null
          id: string
          image_url: string | null
          is_verified: boolean | null
          likes_count: number | null
          shares_count: number | null
          tags: string[] | null
          updated_at: string
          user_id: string
          warning_message: string | null
        }
        Insert: {
          badge?: string | null
          comments_count?: number | null
          content: string
          created_at?: string
          group_name?: string | null
          id?: string
          image_url?: string | null
          is_verified?: boolean | null
          likes_count?: number | null
          shares_count?: number | null
          tags?: string[] | null
          updated_at?: string
          user_id: string
          warning_message?: string | null
        }
        Update: {
          badge?: string | null
          comments_count?: number | null
          content?: string
          created_at?: string
          group_name?: string | null
          id?: string
          image_url?: string | null
          is_verified?: boolean | null
          likes_count?: number | null
          shares_count?: number | null
          tags?: string[] | null
          updated_at?: string
          user_id?: string
          warning_message?: string | null
        }
        Relationships: []
      }
      daily_task_completions: {
        Row: {
          completed_at: string | null
          created_at: string
          date: string
          id: string
          points_earned: number | null
          task_id: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          date?: string
          id?: string
          points_earned?: number | null
          task_id: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          date?: string
          id?: string
          points_earned?: number | null
          task_id?: string
          user_id?: string
        }
        Relationships: []
      }
      experts: {
        Row: {
          bio: string | null
          created_at: string
          hourly_rate: number
          id: string
          image_url: string | null
          is_available: boolean | null
          name: string
          rating: number | null
          specialty: string
          title: string
          total_reviews: number | null
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          hourly_rate: number
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          name: string
          rating?: number | null
          specialty: string
          title: string
          total_reviews?: number | null
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          hourly_rate?: number
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          name?: string
          rating?: number | null
          specialty?: string
          title?: string
          total_reviews?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      group_memberships: {
        Row: {
          group_id: string | null
          id: string
          joined_at: string
          user_id: string
        }
        Insert: {
          group_id?: string | null
          id?: string
          joined_at?: string
          user_id: string
        }
        Update: {
          group_id?: string | null
          id?: string
          joined_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_memberships_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "community_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          brand: string | null
          category: string
          certifications: string[] | null
          created_at: string
          description: string | null
          dietary_tags: string[] | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          is_organic: boolean | null
          name: string
          points_redeemable: number | null
          price: number
          rating: number | null
          stock_quantity: number | null
          total_reviews: number | null
          updated_at: string
        }
        Insert: {
          brand?: string | null
          category: string
          certifications?: string[] | null
          created_at?: string
          description?: string | null
          dietary_tags?: string[] | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          is_organic?: boolean | null
          name: string
          points_redeemable?: number | null
          price: number
          rating?: number | null
          stock_quantity?: number | null
          total_reviews?: number | null
          updated_at?: string
        }
        Update: {
          brand?: string | null
          category?: string
          certifications?: string[] | null
          created_at?: string
          description?: string | null
          dietary_tags?: string[] | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          is_organic?: boolean | null
          name?: string
          points_redeemable?: number | null
          price?: number
          rating?: number | null
          stock_quantity?: number | null
          total_reviews?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          allergies: string[] | null
          avatar_url: string | null
          bio: string | null
          challenge_preferences: Json | null
          challenge_start_date: string | null
          created_at: string
          current_activity_level: string | null
          current_day: number | null
          current_streak: number | null
          daily_completion_history: Json | null
          diet_type: string | null
          display_name: string | null
          eco_challenges: string | null
          eco_habits: string[] | null
          eco_interest_level: string | null
          fitness_barriers: string | null
          fitness_goals: string[] | null
          food_problems: string | null
          health_conditions: string[] | null
          id: string
          join_date: string | null
          journey_start_date: string | null
          meals_per_day: number | null
          mental_health_concerns: string | null
          mental_health_status: string | null
          onboarding_completed: boolean | null
          other_health_issues: string | null
          personalized_challenge: Json | null
          physical_activity_level: string | null
          processed_food_frequency: string | null
          relaxation_methods: string[] | null
          routine_challenges: string | null
          sleep_duration: string | null
          sleep_quality: string | null
          sleep_time: string | null
          stress_frequency: string | null
          total_points: number | null
          updated_at: string
          user_id: string
          wake_time: string | null
          work_schedule: string | null
        }
        Insert: {
          allergies?: string[] | null
          avatar_url?: string | null
          bio?: string | null
          challenge_preferences?: Json | null
          challenge_start_date?: string | null
          created_at?: string
          current_activity_level?: string | null
          current_day?: number | null
          current_streak?: number | null
          daily_completion_history?: Json | null
          diet_type?: string | null
          display_name?: string | null
          eco_challenges?: string | null
          eco_habits?: string[] | null
          eco_interest_level?: string | null
          fitness_barriers?: string | null
          fitness_goals?: string[] | null
          food_problems?: string | null
          health_conditions?: string[] | null
          id?: string
          join_date?: string | null
          journey_start_date?: string | null
          meals_per_day?: number | null
          mental_health_concerns?: string | null
          mental_health_status?: string | null
          onboarding_completed?: boolean | null
          other_health_issues?: string | null
          personalized_challenge?: Json | null
          physical_activity_level?: string | null
          processed_food_frequency?: string | null
          relaxation_methods?: string[] | null
          routine_challenges?: string | null
          sleep_duration?: string | null
          sleep_quality?: string | null
          sleep_time?: string | null
          stress_frequency?: string | null
          total_points?: number | null
          updated_at?: string
          user_id: string
          wake_time?: string | null
          work_schedule?: string | null
        }
        Update: {
          allergies?: string[] | null
          avatar_url?: string | null
          bio?: string | null
          challenge_preferences?: Json | null
          challenge_start_date?: string | null
          created_at?: string
          current_activity_level?: string | null
          current_day?: number | null
          current_streak?: number | null
          daily_completion_history?: Json | null
          diet_type?: string | null
          display_name?: string | null
          eco_challenges?: string | null
          eco_habits?: string[] | null
          eco_interest_level?: string | null
          fitness_barriers?: string | null
          fitness_goals?: string[] | null
          food_problems?: string | null
          health_conditions?: string[] | null
          id?: string
          join_date?: string | null
          journey_start_date?: string | null
          meals_per_day?: number | null
          mental_health_concerns?: string | null
          mental_health_status?: string | null
          onboarding_completed?: boolean | null
          other_health_issues?: string | null
          personalized_challenge?: Json | null
          physical_activity_level?: string | null
          processed_food_frequency?: string | null
          relaxation_methods?: string[] | null
          routine_challenges?: string | null
          sleep_duration?: string | null
          sleep_quality?: string | null
          sleep_time?: string | null
          stress_frequency?: string | null
          total_points?: number | null
          updated_at?: string
          user_id?: string
          wake_time?: string | null
          work_schedule?: string | null
        }
        Relationships: []
      }
      wishlists: {
        Row: {
          created_at: string
          id: string
          product_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlists_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      workshops: {
        Row: {
          category: string
          created_at: string
          current_participants: number | null
          description: string | null
          duration_minutes: number | null
          id: string
          image_url: string | null
          instructor_image: string | null
          instructor_name: string
          is_featured: boolean | null
          is_live: boolean | null
          max_participants: number | null
          price: number
          start_time: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          current_participants?: number | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          image_url?: string | null
          instructor_image?: string | null
          instructor_name: string
          is_featured?: boolean | null
          is_live?: boolean | null
          max_participants?: number | null
          price?: number
          start_time?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          current_participants?: number | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          image_url?: string | null
          instructor_image?: string | null
          instructor_name?: string
          is_featured?: boolean | null
          is_live?: boolean | null
          max_participants?: number | null
          price?: number
          start_time?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      decrement_group_members: {
        Args: { group_id: string }
        Returns: undefined
      }
      deduct_user_points: {
        Args: { points_to_deduct: number; user_id: string }
        Returns: undefined
      }
      get_public_profile: {
        Args: { profile_user_id: string }
        Returns: {
          avatar_url: string
          bio: string
          current_streak: number
          display_name: string
          id: string
          join_date: string
          total_points: number
          user_id: string
        }[]
      }
      increment_group_members: {
        Args: { group_id: string }
        Returns: undefined
      }
      increment_post_likes: {
        Args: { post_id: string }
        Returns: undefined
      }
      increment_post_shares: {
        Args: { post_id: string }
        Returns: undefined
      }
      increment_workshop_participants: {
        Args: { workshop_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
