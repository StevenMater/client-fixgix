import NewGroupForm from '../../components/NewGroup/NewGroupForm';
import './welcome-page.css';

export default function WelcomePage() {
  return (
    <div className="welcome-page-container">
      <NewGroupForm title={'Please create a group to start using FixGix'} />
    </div>
  );
}
