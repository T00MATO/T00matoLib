using System;

namespace CSharpLib
{
    public interface IYieldCondition
    {
        public bool IsFinished();
    }

    public class WaitForSeconds : IYieldCondition
    {
        private DateTime _start;
        private TimeSpan _duration;

        public bool IsFinished() => DateTime.Now - _start > _duration;

        public WaitForSeconds(double duration)
        {
            _start = DateTime.Now;
            _duration = TimeSpan.FromSeconds(duration);
        }
    }

    public class WaitForNextFrame : IYieldCondition
    {
        public bool IsFinished() => true;
    }

    public class WaitUntil : IYieldCondition
    {
        private Func<bool> _func;

        public bool IsFinished() => _func();

        public WaitUntil(Func<bool> func)
        {
            _func = func;
        }
    }
}
