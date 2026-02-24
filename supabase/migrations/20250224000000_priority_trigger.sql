-- Function to update priority_score based on upvotes
CREATE OR REPLACE FUNCTION update_priority_score()
RETURNS TRIGGER AS $$
BEGIN
    -- Simple logic: priority_score equals upvotes.
    -- This can be expanded to include other factors (e.g., time decay, category weight) later.
    NEW.priority_score = NEW.upvotes;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to execute the function when upvotes are updated
CREATE TRIGGER update_issues_priority_score
BEFORE UPDATE OF upvotes ON issues
FOR EACH ROW
EXECUTE FUNCTION update_priority_score();
