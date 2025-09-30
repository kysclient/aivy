import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';

interface ReportModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ReportModal = ({ open, setOpen }: ReportModalProps) => {
  const [reason, setReason] = useState('회원을 향한 상습 비방');
  const [detail, setDetail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const report = async () => {
    setIsLoading(true);

    setTimeout(() => {
      toast('정상적으로 신고되었습니다.');
      setIsLoading(false);
      setOpen(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>게시글 신고하기</DialogTitle>
          <DialogDescription>신고 사유</DialogDescription>
        </DialogHeader>
        <RadioGroup
          value={reason}
          onValueChange={(val) => {
            setReason(val);
          }}
        >
          <div className="grid gap-4">
            {reportReasons.map((report) => (
              <div key={report.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  className="w-5 h-5"
                  value={report.reason}
                  id={report.id.toString()}
                />
                <Label className="text-md" htmlFor={report.id.toString()}>
                  {report.reason}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
        <div className="space-y-2">
          <p>상세 내용</p>
          <Textarea
            value={detail}
            onChange={(e) => {
              setDetail(e.target.value);
            }}
            className="resize-none"
          />
        </div>
        <DialogFooter>
          <Button
            disabled={isLoading}
            onClick={report}
            type="button"
            className="w-full text-white font-bold"
          >
            등록
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportModal;

const reportReasons = [
  { reason: '회원을 향한 상습 비방', id: 1 },
  { reason: '음란하거나 성적인 게시글', id: 2 },
  { reason: '정치인 관련 게시글', id: 3 },
  { reason: '홍보성/불법광고 게시글', id: 4 },
  { reason: '성적 불법촬영물', id: 5 },
  { reason: '성적 허위영상물', id: 6 },
  { reason: '아동·청소년성착취물', id: 7 },
  { reason: '기타', id: 8 },
  { reason: '게시판 양식 위반', id: 9 },
];
