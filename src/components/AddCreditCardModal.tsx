import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard } from "lucide-react";

interface AddCreditCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveCard: (cardData: { name: string; number: string; expiry: string; cvv: string; saveCard: boolean }) => void;
}

const AddCreditCardModal = ({ isOpen, onClose, onSaveCard }: AddCreditCardModalProps) => {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveCard({ name: cardName, number: cardNumber, expiry, cvv, saveCard });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Add a Credit Card
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="cardName">Cardholder Name *</Label>
            <Input 
              id="cardName" 
              value={cardName} 
              onChange={(e) => setCardName(e.target.value)} 
              placeholder="John Doe"
              required 
            />
          </div>
          <div>
            <Label htmlFor="cardNumber">Card Number *</Label>
            <Input 
              id="cardNumber" 
              value={cardNumber} 
              onChange={(e) => setCardNumber(e.target.value)} 
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              required 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry">Expiry Date *</Label>
              <Input 
                id="expiry" 
                value={expiry} 
                onChange={(e) => setExpiry(e.target.value)} 
                placeholder="MM/YY"
                maxLength={5}
                required 
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV *</Label>
              <Input 
                id="cvv" 
                value={cvv} 
                onChange={(e) => setCvv(e.target.value)} 
                placeholder="123"
                maxLength={4}
                required 
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              checked={saveCard} 
              onCheckedChange={(checked) => setSaveCard(checked === true)} 
            />
            <label className="text-sm text-foreground">Save this card for future payments</label>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              Save & Continue
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCreditCardModal;
