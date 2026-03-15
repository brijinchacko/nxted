"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, User, BookOpen, CreditCard, Loader2 } from "lucide-react";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studyTime, setStudyTime] = useState(15);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/user/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setName(data.user.name ?? "");
          setEmail(data.user.email ?? "");
          setStudyTime(data.user.studyTimeMinutes ?? 15);
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/user/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, studyTimeMinutes: studyTime }),
    });
    setSaving(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Settings className="h-7 w-7 text-brand-primary" />
        <h1 className="text-3xl font-heading font-bold">Settings</h1>
      </div>

      {/* Profile */}
      <Card className="bg-nxted-card border-nxted-border mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-nxted-muted mb-1 block">Display Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="text-sm text-nxted-muted mb-1 block">Email</label>
            <Input
              value={email}
              disabled
              className="opacity-50"
            />
          </div>
        </CardContent>
      </Card>

      {/* Learning Preferences */}
      <Card className="bg-nxted-card border-nxted-border mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Learning Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-nxted-muted mb-1 block">
              Daily Study Time (minutes)
            </label>
            <div className="flex gap-2">
              {[5, 10, 15, 20].map((t) => (
                <button
                  key={t}
                  onClick={() => setStudyTime(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    studyTime === t
                      ? "bg-brand-primary text-white"
                      : "bg-nxted-card-alt text-nxted-dark hover:bg-nxted-border"
                  }`}
                >
                  {t}min
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subscription */}
      <Card className="bg-nxted-card border-nxted-border mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Subscription
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            onClick={async () => {
              const res = await fetch("/api/stripe/portal", { method: "POST" });
              const data = await res.json();
              if (data.url) window.location.href = data.url;
            }}
          >
            Manage Subscription
          </Button>
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={saving}>
        {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        Save Changes
      </Button>
    </div>
  );
}
