import {
  ArrowLeft,
  CircleCheck,
  Info,
  Mail,
  PackageCheck,
  Save,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useApiMutation } from "../../hooks/useApi";
import { useAuth } from "../../context/AuthContext";
import { useLoginModal } from "../../context/LoginModalContext";
import "./OrderDetails.css";
import "./Profile.css";

type ProfileDetails = {
  name: string;
  email: string;
  city: string;
  residentialAddress: string;
  region: string;
};

const Profile: React.FC = () => {
  const { authUser } = useLoginModal();
  const { customerId } = useAuth();
  const [profile, setProfile] = useState<ProfileDetails>(() => ({
    name: authUser.includes("@") ? "" : authUser,
    email: authUser.includes("@") ? authUser : "",
    city: "",
    residentialAddress: "",
    region: "",
  }));
  const updateProfile = useApiMutation<{ message?: string } | null>(
    customerId ? `/customer/${encodeURIComponent(customerId)}` : "/customer",
    "PATCH",
    {
      onSuccess: (response) => {
        toast.success(response?.message || "Profile updated successfully.");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );
  const accountName = profile.name.trim() || authUser || "Kafup customer";
  const initials = accountName.trim().slice(0, 2).toUpperCase() || "K";

  const updateField = (field: keyof ProfileDetails, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!customerId) {
      toast.error("Your account ID is not available yet.");
      return;
    }
    updateProfile.mutate(profile);
  };

  return (
    <main className="container portal-order-page portal-profile-page py-4 py-lg-5">
      <div className="mb-4">
        <h1 className="portal-order-page-title mb-2">Your profile</h1>
        <p className="portal-profile-intro mb-0">
          Your account details and shopping shortcuts in one place.
        </p>
      </div>

      <section className="portal-profile-hero mb-4" aria-label="Account profile">
        <div className="portal-profile-identity">
          <span className="portal-profile-avatar" aria-hidden="true">
            {initials}
          </span>
          <div>
            <span className="portal-profile-eyebrow">KAFUP ACCOUNT</span>
            <h2>{accountName}</h2>
            <p>Welcome to your personal account.</p>
          </div>
        </div>
        <span className="portal-profile-active">
          <CircleCheck size={15} />
          Active
        </span>
      </section>

      <section
        className="portal-detail-panel mb-4"
        aria-labelledby="profile-details-title"
      >
        <header className="portal-section-heading">
          <div>
            <span className="portal-detail-eyebrow">ACCOUNT</span>
            <h2 id="profile-details-title">Profile details</h2>
            <p>Edit the contact and delivery details for your account.</p>
          </div>
          <span className="portal-detail-icon" aria-hidden="true">
            <UserRound size={18} />
          </span>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="portal-profile-form-grid">
            <div className="portal-profile-form-field">
              <label htmlFor="profile-name">Full name</label>
              <input
                id="profile-name"
                className="form-control"
                autoComplete="name"
                required
                value={profile.name}
                onChange={(event) => updateField("name", event.target.value)}
              />
            </div>
            <div className="portal-profile-form-field">
              <label htmlFor="profile-email">
                <Mail size={14} aria-hidden="true" />
                Email address
              </label>
              <input
                id="profile-email"
                type="email"
                className="form-control"
                autoComplete="email"
                required
                value={profile.email}
                onChange={(event) => updateField("email", event.target.value)}
              />
              <Link
                className="portal-profile-verify-link"
                to="/portal/verify-email"
                state={{ email: profile.email }}
              >
                Verify this email
              </Link>
            </div>
            <div className="portal-profile-form-field">
              <label htmlFor="profile-city">City</label>
              <input
                id="profile-city"
                className="form-control"
                autoComplete="address-level2"
                required
                value={profile.city}
                onChange={(event) => updateField("city", event.target.value)}
              />
            </div>
            <div className="portal-profile-form-field">
              <label htmlFor="profile-region">Region</label>
              <input
                id="profile-region"
                className="form-control"
                autoComplete="address-level1"
                required
                value={profile.region}
                onChange={(event) => updateField("region", event.target.value)}
              />
            </div>
            <div className="portal-profile-form-field is-wide">
              <label htmlFor="profile-address">Residential address</label>
              <textarea
                id="profile-address"
                className="form-control"
                autoComplete="street-address"
                rows={3}
                required
                value={profile.residentialAddress}
                onChange={(event) =>
                  updateField("residentialAddress", event.target.value)
                }
              />
            </div>
          </div>
          <div className="portal-profile-form-footer">
            <p className="portal-profile-save-note" role="status">
              {customerId
                ? "Your changes will be saved to your account."
                : (
                    <>
                      <Info size={15} aria-hidden="true" />
                      Saving is unavailable until your login provides a customer ID.
                    </>
                  )}
            </p>
            <button
              type="submit"
              className="btn btn-dark d-inline-flex align-items-center gap-2"
              disabled={!customerId || updateProfile.isPending}
            >
              <Save size={16} aria-hidden="true" />
              {updateProfile.isPending ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </section>

      <section
        className="portal-detail-panel"
        aria-labelledby="profile-shortcuts-title"
      >
        <header className="portal-section-heading">
          <div>
            <span className="portal-detail-eyebrow">YOUR KAFUP</span>
            <h2 id="profile-shortcuts-title">Quick links</h2>
            <p>Pick up where you left off.</p>
          </div>
        </header>
        <div className="portal-profile-shortcuts">
          <Link to="/portal/orders" className="portal-profile-shortcut">
            <span className="portal-detail-icon" aria-hidden="true">
              <PackageCheck size={18} />
            </span>
            <span>
              <strong>Order history</strong>
              <small>View your orders and their status.</small>
            </span>
            <ArrowLeft className="portal-profile-shortcut-arrow" size={16} />
          </Link>
          <Link to="/shop" className="portal-profile-shortcut">
            <span className="portal-detail-icon" aria-hidden="true">
              <ShoppingBag size={18} />
            </span>
            <span>
              <strong>Continue shopping</strong>
              <small>Discover more designs from Kafup.</small>
            </span>
            <ArrowLeft className="portal-profile-shortcut-arrow" size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Profile;
