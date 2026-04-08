import { useRef, useState } from "react";
import { useSetProfile } from "../hooks/use-profile";

interface ProfileSetupProps {
  onComplete: () => void;
}

const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;
const MIN_LEN = 3;
const MAX_LEN = 20;

export function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [username, setUsername] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarBase64, setAvatarBase64] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setProfile, isLoading, error } = useSetProfile();

  const isValidUsername =
    username.length >= MIN_LEN &&
    username.length <= MAX_LEN &&
    USERNAME_REGEX.test(username);

  function handleAvatarClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setAvatarPreview(dataUrl);
      setAvatarBase64(dataUrl);
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit() {
    if (!isValidUsername) return;
    try {
      await setProfile(username, avatarBase64 ?? undefined);
      onComplete();
    } catch {
      // error shown via `error` state
    }
  }

  async function handleSkip() {
    onComplete();
  }

  const charCountClass =
    username.length === 0
      ? "profile-char-count"
      : isValidUsername
        ? "profile-char-count profile-char-count-valid"
        : "profile-char-count profile-char-count-invalid";

  return (
    <div className="profile-modal-overlay" data-ocid="profile-setup-overlay">
      <div className="profile-card">
        <div className="profile-card-content">
          {/* Header */}
          <div className="profile-header">
            <h1 className="tech-text glitch-text neon-glow">
              INITIALIZE YOUR IDENTITY
            </h1>
            <p>
              Choose a callsign and avatar to identify yourself in the arena
            </p>
          </div>

          {/* Avatar Upload Zone */}
          <div className="profile-avatar-zone">
            <button
              type="button"
              className="profile-avatar-frame"
              onClick={handleAvatarClick}
              data-ocid="profile-avatar-upload"
              aria-label="Upload profile picture"
              style={{ border: "none", padding: 0 }}
            >
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar preview" />
              ) : (
                <div className="profile-avatar-placeholder">⬡</div>
              )}
            </button>
            <span className="profile-avatar-label">
              {avatarPreview ? "TAP TO CHANGE" : "TAP TO UPLOAD AVATAR"}
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
              aria-label="Choose profile picture file"
            />
          </div>

          {/* Username Input */}
          <div className="profile-username-group">
            <label htmlFor="username-input" className="profile-username-label">
              CALLSIGN
            </label>
            <input
              id="username-input"
              type="text"
              className="profile-username-input"
              placeholder="Enter your callsign..."
              value={username}
              maxLength={MAX_LEN}
              onChange={(e) => setUsername(e.target.value)}
              data-ocid="profile-username-input"
              autoComplete="off"
              spellCheck={false}
            />
            <div className={charCountClass}>
              <span>
                {username.length > 0 && !USERNAME_REGEX.test(username)
                  ? "Letters, numbers and _ only"
                  : username.length > 0 && username.length < MIN_LEN
                    ? `Min ${MIN_LEN} characters`
                    : isValidUsername
                      ? "✓ Valid callsign"
                      : "3–20 characters · letters, numbers, underscores"}
              </span>
              <span>
                {username.length}/{MAX_LEN}
              </span>
            </div>
            {error && (
              <p
                className="mt-2 text-sm"
                style={{ color: "oklch(0.4 0.15 300)" }}
              >
                {error}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="profile-actions">
            <button
              type="button"
              className="profile-btn-complete plasma-button"
              disabled={!isValidUsername || isLoading}
              onClick={handleSubmit}
              data-ocid="profile-submit-btn"
              aria-label="Enter the casino"
            >
              {isLoading ? "INITIALIZING..." : "ENTER THE CASINO"}
            </button>
            <button
              type="button"
              className="profile-btn-skip"
              onClick={handleSkip}
              disabled={isLoading}
              data-ocid="profile-skip-btn"
              aria-label="Skip profile setup"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
