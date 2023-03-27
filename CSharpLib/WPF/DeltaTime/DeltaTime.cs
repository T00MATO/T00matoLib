using System;
using System.Windows.Media;

namespace CSharpLib
{
    public static class DeltaTime
    {
        private static DateTime _prevDateTime;
        private static TimeSpan _currentDeltaTime;

        static DeltaTime()
        {
            _prevDateTime = DateTime.Now;

            CompositionTarget.Rendering += OnRender;
        }

        private static void OnRender(object? sender, EventArgs args)
        {
            _currentDeltaTime = DateTime.Now - _prevDateTime;
            _prevDateTime = DateTime.Now;
        }

        public static double Current
        {
            get => _currentDeltaTime.TotalSeconds;
        }
    }
}
