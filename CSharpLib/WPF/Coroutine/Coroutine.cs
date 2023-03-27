using System;
using System.Collections;
using System.Collections.Generic;
using System.Windows.Media;

namespace CSharpLib
{
    public static class Coroutine
    {
        private static List<IEnumerator> _subRoutines = new();

        static Coroutine()
        {
            CompositionTarget.Rendering += OnRender;
        }

        private static void OnRender(object? sender, EventArgs args)
        {
            lock (_subRoutines)
            {
                for (var iter = 0; iter < _subRoutines.Count;)
                {
                    var subRoutine = _subRoutines[iter];
                    if (IsSubRoutineDone(subRoutine))
                    {
                        _subRoutines.Remove(subRoutine);
                        continue;
                    }

                    iter++;
                }
            }
        }

        private static bool IsSubRoutineDone(IEnumerator subRoutine)
        {
            if (subRoutine.Current is IYieldCondition condition && !condition.IsFinished())
                return false;

            if (subRoutine.MoveNext() && subRoutine.Current != null)
                return false;

            return true;
        }

        public static void Start(IEnumerator subRoutine)
        {
            lock (_subRoutines)
                _subRoutines.Add(subRoutine);
        }

        public static void Stop(IEnumerator subRoutine)
        {
            lock (_subRoutines)
                _subRoutines.Remove(subRoutine);
        }
    }
}
